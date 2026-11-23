# Step 5: RVM (mobilenetv3) person matte, CPU, chunked + resumable.
# in : /data/media/input/main.mp4 (decoded at 30 fps, 540x960)
# out: /data/media/matte/chunk_XXX.png-free mp4 chunks (gray) -> concat -> /data/media/matte/matte.mp4 (540x960, 30 fps)
# usage: python3 scripts/06_matte.py   (re-run skips finished chunks)
import os, subprocess, sys, numpy as np, torch, cv2
torch.set_num_threads(2)
W,H,FPS,CH = 540,960,30,300
OUT='/data/media/matte'; os.makedirs(OUT,exist_ok=True)
SRC='/data/media/input/main.mp4'
N = int(round(68.466667*FPS))  # 2054
model = torch.hub.load('PeterL1n/RobustVideoMatting','mobilenetv3',trust_repo=True).eval()
def frames(start, count):
    t0 = start/FPS
    p = subprocess.Popen(['ffmpeg','-v','error','-ss',f'{t0:.4f}','-i',SRC,'-vf',f'fps={FPS},scale={W}:{H}','-frames:v',str(count),'-f','rawvideo','-pix_fmt','rgb24','-'],stdout=subprocess.PIPE)
    while True:
        b = p.stdout.read(W*H*3)
        if len(b) < W*H*3: break
        yield np.frombuffer(b,np.uint8).reshape(H,W,3)
WARM=8
for c in range(0, N, CH):
    path=f'{OUT}/chunk_{c//CH:03d}.mp4'
    if os.path.exists(path) and os.path.getsize(path)>1000: continue
    s=max(0,c-WARM); cnt=min(CH,N-c)+(c-s)
    enc=subprocess.Popen(['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','gray','-s',f'{W}x{H}','-r',str(FPS),'-i','-','-c:v','libx264','-crf','10','-pix_fmt','yuv420p',path+'.tmp.mp4'],stdin=subprocess.PIPE)
    rec=[None]*4; prev=None
    with torch.no_grad():
        for k,f in enumerate(frames(s,cnt)):
            x=torch.from_numpy(f).permute(2,0,1).float().div(255).unsqueeze(0)
            fgr,pha,*rec=model(x,*rec,downsample_ratio=0.4)
            if k < c-s: continue
            a=pha[0,0].numpy()
            # temporal smoothing (stop hair chatter) + choke 1px + feather
            if prev is not None: a=0.7*a+0.3*prev
            prev=a
            m=(a*255).astype(np.uint8)
            m=cv2.erode(m,np.ones((2,2),np.uint8)); m=cv2.GaussianBlur(m,(3,3),0)
            enc.stdin.write(m.tobytes())
    enc.stdin.close(); enc.wait(); os.rename(path+'.tmp.mp4',path)
    print('chunk',c//CH,'done',flush=True)
lst=f'{OUT}/list.txt'
open(lst,'w').write(''.join(f"file 'chunk_{i:03d}.mp4'\n" for i in range((N+CH-1)//CH)))
subprocess.run(['ffmpeg','-v','error','-y','-f','concat','-safe','0','-i',lst,'-c','copy',f'{OUT}/matte.mp4'],check=True)
print('MATTE_DONE')
