#!/usr/bin/env bash
# Session #18: compositor-free full render. Needs: frames (09_frames.sh) + remotion/public/media/audio.wav (hard link).
# 1) Remotion renderFrames -> /data/media/out_frames/fNNNN.jpeg  2) system ffmpeg stitch + loudnorm -> /data/media/draft.mp4
set -e
O=/data/media/out_frames; mkdir -p $O
cd /data && node Setuchat-Motion/remotion/render_frames.mjs $O
P=$(ls $O | head -1 | sed -E 's/f([0-9]+)\..*/\1/' | wc -c); P=$((P-1))
ffmpeg -v error -y -framerate 30 -i $O/f%0${P}d.jpeg -i /data/media/audio/voice.wav \
  -af "loudnorm=I=-14:TP=-1.5:LRA=11" -c:v libx264 -profile:v high -preset medium -b:v 18M -maxrate 20M -bufsize 36M -pix_fmt yuv420p \
  -c:a aac -b:a 320k -ar 48000 -shortest -movflags +faststart /data/media/draft.mp4
mkdir -p /data/Setuchat-Motion/output/proxy
ffmpeg -v error -y -i /data/media/draft.mp4 -vf scale=480:-2 -c:v libx264 -crf 28 -preset veryfast -c:a aac -b:a 96k /data/Setuchat-Motion/output/proxy/draft_480p.mp4
echo RENDER_DONE
