#!/usr/bin/env bash
# Session #6: run deps -> prep (audio, ASR, grade) -> matte sequentially (2 CPUs). Log: scripts/logs/chain.log
cd /data/Setuchat-Motion
bash scripts/00b_deps.sh
bash scripts/00_bg_prep.sh
python3 scripts/06_matte.py
echo CHAIN_DONE
