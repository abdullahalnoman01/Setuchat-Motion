#!/usr/bin/env bash
# Link rendered media into remotion/public/media (gitignored) + build person.mov (graded RGB + RVM alpha).
set -e
cd /data/Setuchat-Motion
M=remotion/public/media; mkdir -p $M
ln -sfn /data/media/graded/graded.mp4 $M/graded.mp4
A=/data/media/audio/mix.wav; [ -f $A ] || A=/data/media/audio/voice.wav; ln -sfn $A $M/audio.wav
if [ -f /data/media/matte/matte.mp4 ] && [ ! -f /data/media/matte/person.mov ]; then
  # matte 540x960 -> 1080x1920, choke 1px + feather ~2px (brief 5.2), alphamerge, ProRes 4444
  ffmpeg -v error -y -i /data/media/graded/graded.mp4 -i /data/media/matte/matte.mp4 -filter_complex \
   "[1:v]scale=1080:1920:flags=lanczos,format=gray,erosion,gblur=sigma=1.5[a];[0:v][a]alphamerge,format=yuva444p10le" \
   -c:v prores_ks -profile:v 4 -an /data/media/matte/person.mov
fi
[ -f /data/media/matte/person.mov ] && ln -sfn /data/media/matte/person.mov $M/person.mov || true
ls -la $M
