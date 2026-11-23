#!/usr/bin/env bash
# Background prep: deps + audio + ASR + grade. Log: scripts/logs/prep.log
cd /data/Setuchat-Motion
pip3 install -q faster-whisper==1.1.1 soundfile 2>&1 | tail -2
mkdir -p /data/media/audio
ffmpeg -v error -y -i /data/media/input/main.mp4 -vn -ac 1 -ar 16000 /data/media/audio/asr.wav
ffmpeg -v error -y -i /data/media/input/main.mp4 -vn -ac 2 -ar 48000 -c:a pcm_s24le /data/media/audio/voice48k.wav
[ -s data/asr_words.json ] || python3 scripts/02a_asr.py small
bash scripts/05_grade.sh
echo PREP_DONE
