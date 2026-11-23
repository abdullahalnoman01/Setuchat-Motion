#!/usr/bin/env bash
# Session #8: grade -> audio -> torch -> matte (no ASR; words.json committed). Log: scripts/logs/prep8.log
cd /data/Setuchat-Motion
bash scripts/05_grade.sh && echo GRADE_DONE
mkdir -p /data/media/audio
ffmpeg -v error -y -i /data/media/input/main.mp4 -vn -ac 2 -ar 48000 /data/media/audio/voice.wav && echo AUDIO_DONE
python3 -c "import torch" 2>/dev/null || pip3 install -q torch torchvision --index-url https://download.pytorch.org/whl/cpu 2>&1 | tail -2
python3 scripts/06_matte.py
