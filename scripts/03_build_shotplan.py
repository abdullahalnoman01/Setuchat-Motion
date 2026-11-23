# Step 3: brief Section 8 -> data/shots.json, snapped to data/words.json (30 fps frames).
# Spec per shot: framing [(name, ox, word_offset)], lines [text, style, preset, x, y, size, opts].
#  style: sup | B | C | W | G | H (hero colours, brief 4) ; preset: A B C D E F G H (brief 3.4); '' = A-lite for sup
#  opts: al l/c/r (anchor), L f/b (front/behind matte), r rot deg, d dir (-1 from left, 1 from right), w weight
#  Words of the lines must equal the script words of the shot, in order (validated).
import json, sys
FPS=30; N=2054
W=json.load(open('data/words.json'))
S=[
 dict(id='S01',fr=[('PUNCH',0,0),('CLOSE',-60,3),('MEDIUM',60,6)],fx=['I0'],sfx={'কাজও':'boom'},lines=[
  ['আপনার','sup','B',110,300,84,{}],
  ['AI','C','G',60,520,500,{'L':'b'}],
  ['শুধু','sup','A',150,820,76,{'d':-1}],
  ['কথা বলে','sup','A',110,920,84,{'d':-1}],
  ['নাকি','sup','B',160,1020,80,{}],
  ['কাজও','B','D',1180,1250,380,{'al':'r','L':'b'}],
  ['করে?','sup','C',190,1480,96,{}]]),
 dict(id='S02',fr=[('WIDE',-50,0)],lines=[
  ['একটি AI','sup','D',540,300,84,{'al':'c'}],
  ['এ|জে|ন্ট','B','F',540,500,300,{'al':'c'}],
  ['আর একটি','sup','A',150,1150,80,{'d':-1}],
  ['চ্যাটবট,','W','A',990,1330,230,{'al':'r','d':1}]]),
 dict(id='S03',fr=[('CLOSE',0,0)],fx=['I0'],lines=[
  ['পার্থক্য','B','A',540,560,400,{'al':'c','L':'b','d':1}],
  ['কী?','W','B',540,1420,520,{'al':'c','impact':1}]]),
 dict(id='S04',fr=[('MEDIUM',150,0)],ctx=('bottom','চ্যাটবট = শুধু উত্তর।  এজেন্ট = পুরো কাজ।'),ui=[('UI1',0,700,520)],lines=[
  ['একটা চ্যাটবট','sup','A',70,330,84,{'d':-1}],
  ['শুধুমাত্র','W','A',40,1030,210,{'d':-1}],
  ['প্রশ্নের','sup','B',80,1240,84,{}],
  ['উত্তর','B','D',40,1400,280,{}],
  ['দেয়।','sup','C',610,1500,96,{}]]),
 dict(id='S05',fr=[('CLOSE',-150,0)],ctx=('bottom','চ্যাটবট = শুধু উত্তর।  এজেন্ট = পুরো কাজ।'),ui=[('UI2a',0,40,230)],lines=[
  ['একটা এজেন্ট','sup','A',600,330,80,{'d':1}],
  ['সিদ্ধান্ত','B','E',0,900,380,{'L':'b'}],
  ['নিতে পারে,','sup','A',560,1430,90,{'d':1}]]),
 dict(id='S06',fr=[('PUNCH',0,0)],fx=['WHIP0'],ctx=('bottom','চ্যাটবট = শুধু উত্তর।  এজেন্ট = পুরো কাজ।'),ui=[('UI2b',0,40,230)],lines=[
  ['টুলস','C','C',540,330,300,{'al':'c'}],
  ['ব্যবহার','sup','A',540,1150,90,{'al':'c','d':-1}],
  ['করতে পারে','sup','A',540,1260,90,{'al':'c','d':1}]]),
 dict(id='S07',fr=[('MEDIUM',120,0),('CLOSE',-100,3)],ctx=('bottom','চ্যাটবট = শুধু উত্তর।  এজেন্ট = পুরো কাজ।'),ui=[('UI2c',0,40,230)],lines=[
  ['এবং আপনার হয়ে','sup','A',80,330,80,{'d':-1}],
  ['কাজটি','W','A',80,470,220,{'d':-1}],
  ['সম্পন্ন','B','D',540,1050,380,{'al':'c','L':'b'}],
  ['করতে পারে।','sup','B',560,1420,88,{}]]),
 dict(id='S08',fr=[('PUNCH',0,0)],sfx={'আসল':'boom'},lines=[
  ['এটাই','sup','B',540,300,96,{'al':'c'}],
  ['আসল','W','H',540,560,520,{'al':'c','L':'b','impact':1}],
  ['পার্থক্য।','sup','A',540,1350,150,{'al':'c','w':500,'d':1}]]),
 dict(id='S09',fr=[('WIDE',60,0)],ui=[('UI3',0,140,190)],lines=[
  ['ধরুন','sup','B',600,560,96,{}],
  ['একটা কাস্টমার','sup','A',600,670,80,{'d':1}],
  ['আপনার পেইজে','sup','A',600,770,80,{'d':1}],
  ['অর্ডার','B','A',1150,1150,330,{'al':'r','d':1}],
  ['করল।','sup','C',620,1400,96,{}]]),
 dict(id='S10',fr=[('MEDIUM',-140,0)],ui=[('UI4',0,40,330)],lines=[
  ['একটা AI এজেন্ট','sup','A',560,300,80,{'d':1}],
  ['স্টক','C','A',1040,1060,300,{'al':'r','d':1}],
  ['চেক','C','A',1040,1330,300,{'al':'r','d':-1}],
  ['করবে,','sup','B',600,1520,90,{}]]),
 dict(id='S11',fr=[('CLOSE',0,0),('CLOSE',140,3)],ui=[('UI5',0,0,0)],lines=[
  ['নিজেই','W','B',540,330,230,{'al':'c'}],
  ['নাম ঠিকানা নিয়ে','sup','A',540,1490,84,{'al':'c','d':-1}],
  ['অর্ডার প্লেস','B','A',40,1150,230,{'d':-1}],
  ['করবে','sup','C',90,1360,96,{}]]),
 dict(id='S12',fr=[('WIDE',-60,0)],ui=[('UI6',0,40,1330)],lines=[
  ['এমনকি','sup','B',60,300,80,{}],
  ['কুরিয়ারও','B','A',30,520,250,{'d':-1}],
  ['পর্যন্ত','W','B',60,720,120,{}],
  ['বুক করবে।','sup','D',560,1120,110,{}]]),
 dict(id='S13',fr=[('CLOSE',150,0)],fx=['I0'],lines=[
  ['সবচেয়ে','sup','A',540,330,90,{'al':'c','d':-1}],
  ['মজার','C','C',540,1180,360,{'al':'c','wob':1}],
  ['বিষয় হলো','sup','A',540,1440,96,{'al':'c','d':1}]]),
 dict(id='S14',fr=[('MEDIUM',-120,0),('PUNCH',0,9)],sfx={},lines=[
  ['কখন কী','sup','A',620,300,80,{'d':1}],
  ['করতে হবে','sup','A',620,400,80,{'d':1}],
  ['এটা আপনাকে','sup','A',620,500,80,{'d':1}],
  ['বলে দিতে','W','A',1040,1120,190,{'al':'r','d':1}],
  ['হবে','sup','B',700,1320,96,{}],
  ['না।','B','B',540,620,600,{'al':'c','L':'b','impact':1}]]),
 dict(id='S15',fr=[('CLOSE',-150,0)],lines=[
  ['কাস্টমার','sup','A',80,330,84,{'d':-1}],
  ['কী চাচ্ছে','sup','A',80,440,84,{'d':-1}],
  ['এটা','sup','B',80,550,84,{}],
  ['বুঝে','B','G',60,1180,360,{}]]),
 dict(id='S16',fr=[('MEDIUM',-60,0)],lines=[
  ['AI','sup','B',540,250,96,{'al':'c','w':500}],
  ['নিজেই','B','A',540,520,300,{'al':'c','L':'b','d':-1}],
  ['নিজের','W','A',540,1060,250,{'al':'c','d':1}],
  ['সিদ্ধান্ত','W','C',540,1290,250,{'al':'c'}],
  ['নিতে পারবে।','sup','A',540,1490,90,{'al':'c','d':-1}]]),
 dict(id='S17',fr=[('PUNCH',0,0)],sfx={'অটোমেটেড':'boom'},lines=[
  ['এভাবেই','sup','B',80,300,84,{}],
  ['পুরো বিষয়টি','sup','A',80,400,84,{'d':-1}],
  ['অটোমেটেড','G','D',540,1220,250,{'al':'c','rot':1}],
  ['হয়ে যাবে।','sup','A',540,1480,96,{'al':'c','d':1}]]),
 dict(id='S18',fr=[('WIDE',0,0)],desat=1,fx=['I0'],sfx={'তবে':'boom'},lines=[
  ['তবে','W','B',540,420,340,{'al':'c','exitAt':1}],
  ['সবকিছুই','sup','A',70,320,84,{'d':-1}],
  ['AI এর হাতে','sup','A',70,430,84,{'d':-1}],
  ['ছেড়ে দেওয়া','sup','A',70,540,84,{'d':-1}],
  ['যায় না।','B','A',1060,1250,250,{'al':'r','d':1}]]),
 dict(id='S19',fr=[('CLOSE',100,0),('MEDIUM',-100,10)],desat=1,lines=[
  ['একটি AI','sup','A',70,300,84,{'d':-1}],
  ['বুঝবে','C','C',70,470,220,{}],
  ['যদি কাস্টমার','sup','A',70,1080,80,{'d':-1}],
  ['অসন্তুষ্ট','B','A',40,1240,230,{'d':-1,'shake':1}],
  ['হয় বা কোনো','sup','A',600,300,80,{'d':1,'clear':9}],
  ['জটিল','W','B',600,450,220,{'rgb':1}],
  ['প্রক্রিয়া সামনে চলে আসে','sup','D',540,1450,84,{'al':'c'}]]),
 dict(id='S20',fr=[('PUNCH',0,0)],desat=2,lines=[
  ['তাহলে কখন','sup','A',540,300,90,{'al':'c','d':-1}],
  ['মানুষের','W','H',540,1120,250,{'al':'c'}],
  ['সাহায্য প্রয়োজন','sup','A',540,1350,96,{'al':'c','d':1}],
  ['হবে।','sup','B',540,1460,96,{'al':'c'}]]),
 dict(id='S21',fr=[('MEDIUM',-140,0),('CLOSE',120,6)],ctx=('bottom','জটিল কেস? → সরাসরি হিউম্যান সাপোর্টে।'),ui=[('UI7',0,40,330)],lines=[
  ['তখন সে সরাসরি','sup','A',560,300,80,{'d':1}],
  ['হিউম্যান সাপোর্টের','B','E',0,950,330,{'L':'b'}],
  ['কাছে','sup','B',560,420,84,{}],
  ['কনভারসেশনটি','sup','A',540,1330,110,{'al':'c','d':-1,'w':500}],
  ['পাঠিয়ে দিবে।','sup','A',540,1450,90,{'al':'c','d':1}]]),
 dict(id='S22',fr=[('CLOSE',120,0),('WIDE',0,5)],ctx=('top','Replies + Orders + Courier + Support — সব অটোমেটেড।'),ui=[('UI8',5,40,600)],lines=[
  ['আপনার ব্যবসায়','sup','A',70,330,80,{'d':-1,'clear':5}],
  ['শুধু','sup','B',70,440,80,{'clear':5}],
  ['রিপ্লাই','W','A',60,1180,260,{'d':-1,'strike':4,'clear':5}],
  ['নয়,','sup','B',700,1400,96,{'clear':5}],
  ['পুরো কাজই','B','A',1050,560,230,{'al':'r','L':'b','d':1}],
  ['অটোমেট','C','D',1040,1150,230,{'al':'r'}],
  ['করতে চান,','sup','A',1000,1360,96,{'al':'r','d':1}]]),
 dict(id='S23',fr=[('PUNCH',140,0)],lines=[
  ['তাহলে পরিচিত হন','sup','A',90,300,80,{'d':-1}],
  ['চ্যাটবট নয়','sup','B',90,410,84,{'strike':1}],
  ['AI অটোমেশনের','G','D',540,640,200,{'al':'c','L':'b'}],
  ['সাথে।','sup','C',540,1350,110,{'al':'c'}]]),
 dict(id='S24',fr=[('CLOSE',0,0)],cta=1,fx=['I_END'],sfx={'SetuChat':'whoosh'},lines=[
  ['কানেক্ট হোন','sup','B',1000,260,84,{'al':'r'}],
  ['SetuChat','G','A',40,520,330,{'L':'b','split':1,'d':-1}],
  ['এর সঙ্গে।','sup','A',1000,1000,90,{'al':'r','d':1}]]),
]
script=[w['text'] for w in W]
k=0; out=[]
f=lambda t: int(round(t*FPS))
for sh in S:
    sh_lines=[]
    for (txt,st,pr,x,y,sz,o) in sh['lines']:
        parts=txt.replace('|','').split() if pr!='F' else [txt.replace('|','')]
        ws=[]
        for p in parts:
            if k>=len(script) or script[k]!=p: sys.exit(f"MISMATCH {sh['id']} expected {script[k] if k<len(script) else None!r} got {p!r}")
            ws.append({'i':k,'text':p,'f':max(0,f(W[k]['start'])-1),'fe':f(W[k]['end'])}); k+=1
        L={'text':txt,'style':st,'preset':pr,'x':x,'y':y,'size':sz,'words':ws}; L.update(o)
        if pr=='F': L['graphemes']=txt.split('|')
        sh_lines.append(L)
    sh=dict(sh); sh['lines']=sh_lines; out.append(sh)
if k!=len(script): sys.exit(f"UNUSED words from {k}: {script[k:k+5]}")
# shot boundaries: cut 2 frames before the first word of the shot
for n,sh in enumerate(out):
    first=min(w['f'] for L in sh['lines'] for w in L['words'])
    sh['from']=0 if n==0 else max(out[n-1]['from']+6, first-2)
for n,sh in enumerate(out):
    sh['to']=out[n+1]['from'] if n+1<len(out) else N
    allw=[w for L in sh['lines'] for w in L['words']]; allw.sort(key=lambda w:w['i'])
    fr=[]
    for (name,ox,wo) in sh['fr']:
        fr.append({'name':name,'ox':ox,'from':sh['from'] if wo==0 else allw[wo]['f']-1})
    sh['fr']=fr
    for L in sh['lines']:
        if 'clear' in L: L['exit']=allw[L['clear']]['f']-1
        if L.get('exitAt'): L['exit']=allw[1]['f']-1
        if 'strike' in L: L['strikeF']=allw[L['strike']]['f']
    sh['ui']=[{'k':u[0],'from':sh['from'] if u[1]==0 else allw[u[1]]['f']-2,'x':u[2],'y':u[3],'wf':[w['f'] for w in allw]} for u in sh.get('ui',[])]
    sh['lastEnd']=allw[-1]['fe']
json.dump({'fps':FPS,'frames':N,'shots':out},open('data/shots.json','w'),ensure_ascii=False,indent=1)
# validation report
for sh in out:
    d=(sh['to']-sh['from'])/FPS
    print(sh['id'],sh['from'],sh['to'],f"{d:.2f}s",'cuts',len(sh['fr']), 'WARN>3s' if max([b['from'] for b in sh['fr'][1:]]+[sh['from']])+90<sh['to'] and d>3 else '')
print('OK words',k)
