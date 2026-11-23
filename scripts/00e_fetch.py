# Fetch Git LFS inputs via the LFS batch API (no git-lfs binary needed) -> /data/media/input
import json,os,re,subprocess,urllib.request,base64,shutil,glob
os.chdir('/data/Setuchat-Motion')
tok=re.search(r'https://[^:]*:([^@]*)@',open(os.path.expanduser('~/.git-credentials')).read()).group(1)
auth='Basic '+base64.b64encode(f'x-access-token:{tok}'.encode()).decode()
D='/data/media/input'; os.makedirs(D,exist_ok=True)
files={'main.mp4':'assets/Setuchat Content 2 before motion.mp4','reference.mp4':glob.glob('assets/Extend*.mp4')[0]}
for safe,p in files.items():
    t=open(p).read(); oid=re.search(r'sha256:(\w+)',t).group(1); size=int(re.search(r'size (\d+)',t).group(1))
    out=f'{D}/{safe}'
    if os.path.exists(out) and os.path.getsize(out)==size: continue
    req=urllib.request.Request('https://github.com/abdullahalnoman01/Setuchat-Motion.git/info/lfs/objects/batch',
        data=json.dumps({'operation':'download','transfers':['basic'],'objects':[{'oid':oid,'size':size}]}).encode(),
        headers={'Authorization':auth,'Accept':'application/vnd.git-lfs+json','Content-Type':'application/vnd.git-lfs+json'})
    o=json.load(urllib.request.urlopen(req))['objects'][0]['actions']['download']
    subprocess.run(['curl','-sfL','-o',out,o['href']]+sum([['-H',f'{k}: {v}'] for k,v in o.get('header',{}).items()],[]),check=True)
    print(safe,os.path.getsize(out))
for a,b in [('assets/logo.png','logo.png'),('assets/transcript.txt','transcript.txt'),('assets/Motion Vdo Instruction.txt','motion_brief.txt')]: shutil.copy(a,f'{D}/{b}')
