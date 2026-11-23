# Step 2.3: align SCRIPT words (assets/transcript.txt) to ASR words (data/asr_words.json)
# by character-level sequence alignment -> data/words.json [{i,text,start,end,phrase_id}]
import json, difflib, re, unicodedata
script = open('assets/transcript.txt').read().split()
asr = json.load(open('data/asr_words.json'))['words']
PH = [(0.50,3.00),(3.50,4.65),(5.00,5.80),(6.30,6.90),(7.50,8.35),(8.85,10.70),(11.10,12.00),(12.40,13.45),(13.80,17.60),(18.05,22.85),(23.25,24.35),(24.85,25.80),(26.30,31.20),(31.55,32.90),(33.35,35.75),(36.05,37.20),(37.50,40.10),(40.45,43.85),(44.15,45.60),(45.90,53.20),(53.50,61.10),(61.40,65.15),(65.45,66.10),(66.40,67.40)]
def norm(s):
    s = unicodedata.normalize('NFC', s.lower())
    s = s.replace('এআই','ai').replace('এ আই','ai')
    return re.sub(r'[\s\.,!?।\-–—"\'‘’“”:;]', '', s)
# char streams with owner indices
A=[];Aw=[]
for k,w in enumerate(asr):
    t=norm(w['text'])
    for j,ch in enumerate(t): A.append(ch); Aw.append((k,j,len(t)))
S=[];Sw=[]
for i,w in enumerate(script):
    t=norm(w)
    for j,ch in enumerate(t): S.append(ch); Sw.append(i)
sm = difflib.SequenceMatcher(None, S, A, autojunk=False)
s2a = {}
for a,b,n in sm.get_matching_blocks():
    for d in range(n): s2a[a+d]=b+d
def t_of(ai, edge='start'):
    k,j,L = Aw[ai]; w=asr[k]; return w['start']+(w['end']-w['start'])*(j/ max(L,1))
starts=[None]*len(script); ends=[None]*len(script); conf=[0]*len(script)
for i in range(len(script)):
    idx=[p for p in range(len(S)) if Sw[p]==i]
    m=[s2a[p] for p in idx if p in s2a]
    conf[i]=len(m)/max(len(idx),1)
    if m and conf[i]>=0.34:
        starts[i]=t_of(min(m)); k,_,_=Aw[max(m)]; ends[i]=asr[k]['end']
# interpolate gaps
known=[i for i in range(len(script)) if starts[i] is not None]
for i in range(len(script)):
    if starts[i] is None:
        lo=max([k for k in known if k<i],default=None); hi=min([k for k in known if k>i],default=None)
        t0=ends[lo] if lo is not None else 0.5; t1=starts[hi] if hi is not None else 67.4
        n=(hi if hi is not None else len(script))-(lo if lo is not None else -1)
        pos=i-(lo if lo is not None else -1)
        starts[i]=t0+(t1-t0)*(pos-0.5)/n; ends[i]=t0+(t1-t0)*(pos+0.3)/n
# monotonic + small early bias (1 frame) so words never appear late
out=[];prev=0
for i,w in enumerate(script):
    s=max(starts[i]-0.033, prev+0.034); e=max(ends[i], s+0.12); prev=s
    pid=min(range(len(PH)), key=lambda p: 0 if PH[p][0]-0.35<=s<=PH[p][1]+0.35 else min(abs(s-PH[p][0]),abs(s-PH[p][1])))
    out.append({'i':i,'text':w,'start':round(s,3),'end':round(e,3),'phrase_id':pid,'conf':round(conf[i],2)})
for i in range(len(out)-1): out[i]['end']=min(out[i]['end'], max(out[i+1]['start'], out[i]['start']+0.12))
json.dump(out,open('data/words.json','w'),ensure_ascii=False,indent=0)
with open('scripts/logs/timing_check.log','w') as f:
    bad=0
    for w in out:
        inph=any(a-0.3<=w['start']<=b+0.3 for a,b in PH); bad+= not inph
        f.write(f"{w['i']:3d} {w['start']:6.2f} {w['end']:6.2f} p{w['phrase_id']:02d} c{w['conf']:.2f} {'OK ' if inph else 'OUT'} {w['text']}\n")
    f.write(f"words={len(out)} script={len(script)} outside_phrases={bad} first={out[0]['start']} last_end={out[-1]['end']}\n")
print(open('scripts/logs/timing_check.log').read()[-200:])
