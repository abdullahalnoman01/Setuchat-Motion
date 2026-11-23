#!/usr/bin/env bash
# Session #17: extract graded plate to JPG sequence for FRAMES mode (Main.tsx). 30 fps, frame N = file N (1-based).
set -e
D=/data/Setuchat-Motion/remotion/public/media/frames; mkdir -p $D
ffmpeg -v error -y -i ${1:-/data/media/graded/graded.mp4} -q:v 2 $D/%05d.jpg
ls $D | wc -l
