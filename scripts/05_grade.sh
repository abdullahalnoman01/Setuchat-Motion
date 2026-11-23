#!/usr/bin/env bash
# Step 4.1+4.3: conform main.mp4 to 30 fps + dark cinematic grade (brief 3.6). No crop needed (data/crop.json).
# Upscale: source is already 1080x1920 -> no AI upscale; punch-ins use lanczos in Remotion (DECISIONS #4).
# out: /data/media/graded/graded.mp4  (~4-6 min on 2 CPU)
set -e
G="eq=contrast=1.2:brightness=-0.1:saturation=0.78:gamma=0.78,curves=r='0/0 0.25/0.14 0.7/0.56 1/0.86':g='0/0 0.25/0.15 0.7/0.57 1/0.87':b='0/0.02 0.25/0.19 0.7/0.6 1/0.88',colorbalance=rs=-0.06:gs=-0.01:bs=0.08:rm=0.02:rh=0.03:bh=-0.03,vignette=PI/3.8"
mkdir -p /data/media/graded
ffmpeg -v error -y -i /data/media/input/main.mp4 -an -vf "fps=30,$G,format=yuv420p" -c:v libx264 -preset veryfast -crf 14 -g 15 /data/media/graded/graded.mp4
ffprobe -v error -count_frames -select_streams v -show_entries stream=nb_read_frames,width,height -of csv=p=0 /data/media/graded/graded.mp4
