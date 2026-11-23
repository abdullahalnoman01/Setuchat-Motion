#!/usr/bin/env bash
# Fetch LFS inputs without git-lfs (media.githubusercontent.com), copy small inputs.
set -e
cd /data/Setuchat-Motion
TOK=$(sed -n 's#https://[^:]*:\([^@]*\)@.*#\1#p' ~/.git-credentials | head -1)
B=https://media.githubusercontent.com/media/abdullahalnoman01/Setuchat-Motion/main/assets
curl -sfL -H "Authorization: token $TOK" -o /data/media/input/main.mp4 "$B/Setuchat%20Content%202%20before%20motion.mp4"
curl -sfL -H "Authorization: token $TOK" -o /data/media/input/reference.mp4 "$B/$(python3 -c "import urllib.parse,glob,os;print(urllib.parse.quote(os.path.basename(glob.glob('assets/Extend*.mp4')[0])))")"
cp assets/logo.png assets/transcript.txt /data/media/input/; cp "assets/Motion Vdo Instruction.txt" /data/media/input/motion_brief.txt
sha256sum /data/media/input/*
