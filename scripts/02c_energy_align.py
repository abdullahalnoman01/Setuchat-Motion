# Step 2.3 (session #7): ASR (whisper small) gave garbage for Bangla (13 words, from 46 s only).
# Fallback: energy-based forced alignment of the SCRIPT. 1) 10 ms RMS envelope of asr.wav,
# 2) DP assigns script words to the measured phrases (brief S2) so syllable rate is even and
# punctuation falls at phrase ends, 3) inside a phrase, words are placed by syllable weight
# and each start is snapped to the nearest energy onset (+-120 ms). -> data/words.json
import json, re, numpy as np, wave
script=open('assets/transcript.txt').read().split()
PH=[(0.50,3.00),(3.50,4.65),(5.00,5.80),(6.30,6.90),(7.50,8.35),(8.85,10.70),(11.10,12.00),(12.40,13.45),(13.80,17.60),(18.05,22.85),(23.25,24.35),(24.85,25.80),(26.30,31.20),(31.55,32.90),(33.35,35.75),(36.05,37.20),(37.50,40.10),(40.45,43.85),(44.15,45.60),(45.90,53.20),(53.50,61.10),(61.40,65.15),(65.45,66.10),(66.40,67.40)]
w_=wave.open("/data/media/audio/asr.wav"); a=np.frombuffer(w_.readframes(w_.getnframes()),np.int16).astype(np.float32)/32768; hop=160
rms=np.sqrt(np.convolve(a**2,np.ones(400)/400,'same')[::hop]+1e-9); db=20*np.log10(rms)
# refine phrase edges with the envelope (speech = > floor+12dB)
thr=np.percentile(db,15)+12
def refine(t0,t1):
    i0,i1=int(t0*100),int(t1*100); lo=max(0,i0-30); hi=min(len(db)-1,i1+30)
    sp=np.where(db[lo:hi]>thr)[0]
    if len(sp)==0: return t0,t1
    return (lo+sp[0])/100,(lo+sp[-1])/100
PH=[refine(*p) for p in PH]
def syl(w):
    w=re.sub(r'[^\w]','',w)
    if re.match(r'^[A-Za-z]+$',w): return {'AI':2,'SetuChat':3}.get(w,max(1,len(w)//3))
    v=len(re.findall(r'[অআইঈউঊঋএঐওঔ]|[\u09be-\u09cc]',w)); c=len(re.findall(r'[\u0995-\u09b9\u09dc-\u09df]',w))-len(re.findall('\u09cd',w))
    return max(1,c+ v*0.2)
wt=[syl(w)+0.15 for w in script]
punct=[1 if re.search(r'[,।?!]$',w) else 0 for w in script]
N=len(script); P=len(PH); dur=[b-a for a,b in PH]
rate=sum(wt)/sum(dur)
cw=np.concatenate([[0],np.cumsum(wt)])
INF=1e18; dp=np.full((P+1,N+1),INF); bk=np.zeros((P+1,N+1),int); dp[0,0]=0
for p in range(1,P+1):
    for j in range(1,N+1):
        for i in range(max(0,j-40),j):
            if dp[p-1,i]>=INF: continue
            exp=(cw[j]-cw[i])/rate; c=((exp-dur[p-1])/max(dur[p-1],0.4))**2*4 - (1.5 if punct[j-1] else 0)
            if dp[p-1,i]+c<dp[p,j]: dp[p,j]=dp[p-1,i]+c; bk[p,j]=i
seg=[];j=N
for p in range(P,0,-1): i=bk[p,j]; seg.append((i,j)); j=i
seg=seg[::-1]
# onset strength
d=np.maximum(0,np.diff(db,prepend=db[0]))
out=[]
for p,(i,j) in enumerate(seg):
    t0,t1=PH[p]; tot=cw[j]-cw[i]
    for k in range(i,j):
        s=t0+(t1-t0)*(cw[k]-cw[i])/tot; e=t0+(t1-t0)*(cw[k+1]-cw[i])/tot
        if k>i:
            c=int(s*100); lo,hi=max(0,c-12),min(len(d)-1,c+12); s=(lo+int(np.argmax(d[lo:hi])))/100
        out.append({'i':k,'text':script[k],'start':s,'end':e,'phrase_id':p})
prev=-1
for w in out:
    w['start']=round(max(w['start']-0.05,prev+0.07),3); prev=w['start']
for k in range(len(out)-1): out[k]['end']=round(max(out[k]['start']+0.1,min(out[k]['end'],out[k+1]['start']+0.3)),3)
json.dump(out,open('data/words.json','w'),ensure_ascii=False,indent=0)
for p,(i,j) in enumerate(seg): print(p,f"{PH[p][0]:.2f}-{PH[p][1]:.2f}",' '.join(script[i:j]))
print('words',len(out),'of',N)
