# DECISIONS
1. Main video is already 1080x1920 vertical (brief Section 0 says pillarboxed 1920x1080). cropdetect → 1080:1920:0:0, so NO crop; data/crop.json records this. Upscale still needed for punch-ins up to 145%.
2. Session #1 left no commits; session #2 restarts as NEW TASK.
3. Instruction file names: repo folder is `assets/` (user wrote "asstes").
4. Session #7: faster-whisper small returned 13 garbage words for Bangla. Replaced with energy-based forced alignment of the SCRIPT onto the brief's measured phrases (scripts/02c_energy_align.py). Accuracy ~±150 ms inside phrases; larger models too slow/heavy on 2 CPU.
5. shots builder compares NFC-normalised text (য় composed vs decomposed) and always displays the script's own codepoints.
