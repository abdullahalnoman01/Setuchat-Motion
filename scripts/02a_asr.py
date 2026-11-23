# Step 2.2: faster-whisper ASR (timing only) -> data/asr_words.json. ~5-10 min CPU. usage: python scripts/02a_asr.py [model]
import json,sys,time
import soundfile as sf
from faster_whisper import WhisperModel
m=sys.argv[1] if len(sys.argv)>1 else "medium"
t=time.time()
model=WhisperModel(m,device="cpu",compute_type="int8",cpu_threads=2)
segs,info=model.transcribe(sf.read("/data/media/audio/asr.wav",dtype="float32")[0],language="bn",word_timestamps=True,beam_size=1,vad_filter=False,
  initial_prompt="আপনার AI শুধু কথা বলে নাকি কাজও করে? একটি AI এজেন্ট আর একটি চ্যাটবট, পার্থক্য কী?")
out=[]
for s in segs:
    print(f"{s.start:.2f}-{s.end:.2f} {s.text}",flush=True)
    for w in s.words: out.append({"text":w.word.strip(),"start":round(w.start,3),"end":round(w.end,3),"p":round(w.probability,3)})
json.dump({"model":m,"words":out},open("data/asr_words.json","w"),ensure_ascii=False,indent=0)
print("done",len(out),"words",round(time.time()-t),"s")
