# PROGRESS

## ⚡ QUICK STATE  (read this first; update at EVERY checkpoint)
- Overall: IN PROGRESS
- Current: Session #5. Steps 2 (ASR), 4.3 (grade), 5 (matte) running in background; Step 6 Remotion starting.
- NEXT ACTION: when data/asr_words.json exists -> scripts/02b_align.py -> data/words.json; build Remotion.
- Media on THIS computer: inputs ✔, audio ✔, ASR/grade/matte running
- Running background jobs: scripts/00_bg_prep.sh (ASR small + grade), scripts/06_matte.py (RVM chunks)
- Last updated: 2026-11-23 16:05 Asia/Dhaka by Session #5

## Task (copied exactly from the user)
See AI_AGENT_INSTRUCTIONS.md Section 0 TASK. User chat (session #2): "read 'Ai agent
instruction video edit' first … push fast ASAP." Previous session (#1) was stopped
before its first push landed, so this session restarts as NEW TASK.

## Definition of Done
See AI_AGENT_INSTRUCTIONS.md Section 0 (= brief Section 12). Evidence links are added here as boxes get checked.
- [ ] Looks like reference  - [ ] No red  - [ ] Word sync  - [ ] Bangla spelling/shaping
- [ ] Clean mattes  - [ ] Sharp punch-ins  - [ ] Safe zones  - [ ] No dissolves/subtitle bars
- [ ] UI-1..UI-7  - [ ] CTA + logo end card  - [ ] -14 LUFS / TP ≤ -1  - [ ] Output spec
- [ ] Repo README/PROGRESS DONE/proxy

## Plan
- [x] 0 Setup
- [ ] 1 Probe + reference study (1.1 ✔ probe, 1.2 ✔ crop (none needed), 1.3 ref frames, 1.4 notes)
- [ ] 2 Word timing (2.1 audio, 2.2 ASR, 2.3 align → data/words.json)
- [ ] 3 Shot plan data/shots.json + validation
- [ ] 4 Picture prep (4.1 30fps conform, 4.2 upscale, 4.3 grade)
- [ ] 5 Person matte
- [ ] 6 Remotion design system (6.1–6.7)
- [ ] 7 Shots: S01 S02 S03 S04 S05 S06 S07 S08 S09 S10 S11 S12 S13 S14 S15 S16 S17 S18 S19 S20 S21 S22 S23 S24
- [ ] 8 Sound
- [ ] 9 Assembly + final render
- [ ] 10 QA
- [ ] 11 Deliver

## Done so far
- Step 0: repo structure, .gitignore, checkpoint/autopush scripts, inputs.manifest.json.
- Step 1.1/1.2: main = 1080x1920 60 fps 68.467 s, AAC 48k stereo. ALREADY VERTICAL (no pillarbox,
  cropdetect = crop=1080:1920:0:0). Reference 960x720 24 fps 26.7 s.

## Problems / Notes
- Compute: 2 vCPU, 4 GB RAM, no GPU. Heavy AI jobs (Real-ESRGAN, RVM, whisper large) must be light/chunked.

## Environment status
- Internet OK (github, pypi, npm, huggingface, fonts.google). Disk 54 GB free. CPU only (2 cores, 4 GB).
- ffmpeg 7.0.2 static. Python 3.13, Node 24, Remotion preinstalled in /data/node_modules. flock present.

## Environment setup
- git credentials: see AI_AGENT_INSTRUCTIONS.md 3.2 (token hidden).
- (pip installs added as they happen)

## Regenerate media
1. Copy inputs to /data/media/input as main.mp4 reference.mp4 logo.png transcript.txt motion_brief.txt; `sha256sum` vs inputs.manifest.json.
2. `bash scripts/00b_deps.sh` (torch CPU + fonts, ~2 min)
3. `nohup bash scripts/00_bg_prep.sh > scripts/logs/prep.log &` (audio wavs, ASR -> data/asr_words.json if missing, grade -> /data/media/graded/graded.mp4; ~10-15 min)
4. `nohup python3 scripts/06_matte.py > scripts/logs/matte.log &` (RVM matte 540x960 -> /data/media/matte/matte.mp4, resumable chunks, ~20-30 min)

## External actions
- User supplied repo + token in chat (session #2). User asked to push fast.

## Session History
- Session #1: setup attempted, stopped by usage policy before push.
- Session #2 (2026-11-23): NEW TASK restart, Step 0 done.
- Sessions #3/#4: bg prep + ASR fix, stopped by usage policy.
- Session #5 (2026-11-23 15:50): resumed; hashes match; fonts ✔ torch ✔; started ASR+grade+matte.
