#!/usr/bin/env bash
# Session #19: resumable chunked renderFrames (fonts delayRender timeout fix) + stitch. Skips chunks already rendered.
O=/data/media/out_frames; mkdir -p $O; N=${N:-2054}; C=${C:-300}
for ((s=0; s<N; s+=C)); do e=$((s+C-1)); [ $e -ge $N ] && e=$((N-1))
  if [ -f $O/f$(printf %04d $e).jpeg ]; then echo "skip $s-$e"; continue; fi
  for t in 1 2 3; do (cd /data && node Setuchat-Motion/remotion/render_frames.mjs $O $s $e) >> /data/Setuchat-Motion/scripts/logs/render19.log 2>&1 && break; echo "retry $s-$e"; done
  echo "chunk $s-$e done"; done
set -e
ffmpeg -v error -y -framerate 30 -i $O/f%04d.jpeg -i /data/media/audio/voice.wav \
  -af "loudnorm=I=-14:TP=-1.5:LRA=11" -c:v libx264 -profile:v high -preset medium -b:v 18M -maxrate 20M -bufsize 36M -pix_fmt yuv420p \
  -c:a aac -b:a 320k -ar 48000 -shortest -movflags +faststart /data/media/draft.mp4
mkdir -p /data/Setuchat-Motion/output/proxy
ffmpeg -v error -y -i /data/media/draft.mp4 -vf scale=480:-2 -c:v libx264 -crf 28 -preset veryfast -c:a aac -b:a 96k /data/Setuchat-Motion/output/proxy/draft_480p.mp4
echo RENDER_DONE
