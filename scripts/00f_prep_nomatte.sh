#!/usr/bin/env bash
# Session #17: grade + audio only (no torch/matte). Log: scripts/logs/prep17.log
cd /data/Setuchat-Motion
mkdir -p /data/media/audio
ffmpeg -v error -y -i /data/media/input/main.mp4 -vn -ac 2 -ar 48000 /data/media/audio/voice.wav && echo AUDIO_DONE
bash scripts/05_grade.sh && echo GRADE_DONE
