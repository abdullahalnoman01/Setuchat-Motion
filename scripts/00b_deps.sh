#!/usr/bin/env bash
# Install torch CPU (for RVM matte) + download OFL fonts into assets/fonts. Log: scripts/logs/deps.log
cd /data/Setuchat-Motion
pip3 install -q torch torchvision --index-url https://download.pytorch.org/whl/cpu 2>&1 | tail -2
mkdir -p assets/fonts && cd assets/fonts
B=https://github.com/google/fonts/raw/main/ofl
for f in "anekbangla/AnekBangla%5Bwdth,wght%5D.ttf" "notosansbengali/NotoSansBengali%5Bwdth,wght%5D.ttf" "intertight/InterTight%5Bwght%5D.ttf" "hindsiliguri/HindSiliguri-Light.ttf" "hindsiliguri/HindSiliguri-Bold.ttf"; do
  n=$(basename "$f" | sed 's/%5B/[/g;s/%5D/]/g;s/\[.*\]/-VF/'); [ -s "$n" ] || curl -sL -o "$n" "$B/$f"; done
ls -la; file * | cut -c1-100
echo DEPS_DONE
