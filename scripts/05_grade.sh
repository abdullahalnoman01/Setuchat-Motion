#!/usr/bin/env bash
# Conform main.mp4 to 30 fps + dark cinematic grade (brief 3.6). No crop needed (DECISIONS 1).
# usage: ./scripts/05_grade.sh [still_time_s]   (with arg: writes a preview still only)
set -e
IN=/data/media/input/main.mp4; OUT=/data/media/graded/graded.mp4
VF="fps=30,scale=1080:1920:flags=lanczos,\
eq=brightness=-0.10:contrast=1.18:saturation=0.82:gamma=0.80,\
curves=r='0/0 0.25/0.15 0.6/0.48 0.9/0.78 1/0.86':g='0/0 0.25/0.16 0.6/0.49 0.9/0.79 1/0.87':b='0/0.02 0.25/0.20 0.6/0.52 0.9/0.80 1/0.88',\
colorbalance=rs=-0.06:gs=-0.01:bs=0.08:rm=0.02:bm=0.0:rh=0.03:bh=-0.06:gh=-0.01,\
vignette=angle=PI/4.2:mode=forward"
if [ -n "$1" ]; then ffmpeg -loglevel error -y -ss "$1" -i "$IN" -frames:v 1 -vf "$VF" -q:v 3 /tmp/grade_$1.jpg; exit 0; fi
mkdir -p /data/media/graded
ffmpeg -loglevel error -y -i "$IN" -vf "$VF" -an -c:v libx264 -preset veryfast -crf 14 -pix_fmt yuv420p -g 30 "$OUT"
ffprobe -v error -count_frames -select_streams v -show_entries stream=nb_read_frames,width,height -of csv=p=0 "$OUT"
