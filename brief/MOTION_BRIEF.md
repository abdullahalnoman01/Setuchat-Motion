==========================================================================================
 SETUCHAT REEL - FULL MOTION-GRAPHICS EDIT PROMPT
 (Recreate the "Agentic Extend by invideo" reference edit style EXACTLY, rebranded to SetuChat)
==========================================================================================

You are a senior motion designer and short-form video editor. You will receive 4 inputs:

  1. MAIN VIDEO   : "Setuchat Content 2 before motion (1).mp4"  (the footage to edit)
  2. REFERENCE    : "Extend your footage. Never reshoot again ... .mp4"  (the style to copy)
  3. LOGO         : "minimalist-vector-logo-emblem-for-ai-customer-supp (1).png"  (SetuChat logo, transparent PNG)
  4. TRANSCRIPT   : the Bangla script (also written in full in Section 9 of this file)

GOAL: Edit the MAIN VIDEO so it looks like it was cut by the same editor who made the
REFERENCE. Same kinetic typography system, same two-weight text, same masking-behind-the-
person, same motion-blur entries, same 3D bends/flips, same UI overlays, same pace, same
cinematic dark grade. The only differences: the language (Bangla), the brand colours
(SetuChat blue/cyan instead of invideo red) and the brand/CTA.

This must NOT look like a normal captioned video. No subtitle bar, no karaoke captions, no
template "TikTok captions". Every spoken word is designed type that lives INSIDE the scene.
Study the reference frame by frame before you start and match it. When in doubt, copy what
the reference does.


------------------------------------------------------------------------------------------
 0. FACTS ABOUT THE FILES (already measured)
------------------------------------------------------------------------------------------

MAIN VIDEO
  - Container: 1920x1080, 60 fps, 68.47 s, with audio.
  - The real picture is a VERTICAL 9:16 clip pillarboxed in the middle of the 1920x1080
    canvas (black bars left and right). The active picture is about 592x1072 px, at
    x=664, y=4 (crop=592:1072:664:4). Re-detect it with cropdetect to be sure.
  - One continuous single-camera take. No cuts. Medium-wide framing: a young man with
    glasses, long dark hair and a white linen shirt, seated on a wooden chair. A small fluffy
    lav mic is clipped to his chest. Background: bright glass wall, white grid ceiling
    reflections, green ferns on both sides, wooden chair at the right. He gestures a lot with
    both hands. The image is BRIGHT and low-contrast (a white shirt on a light background).
  - Speech starts at about 0.5 s and ends at about 67.4 s.

REFERENCE VIDEO
  - 960x720 (4:3), 24 fps, 26.7 s. 16 shots, cuts at about 1.0, 1.5, 2.9, 4.6, 5.5, 6.7,
    7.0, 7.25, 10.1, 11.1, 14.3, 17.5, 20.0, 22.3 and 24.4 s, so a new shot or big text
    change every 0.5 to 1.7 s.

LOGO COLOURS (sampled from the PNG)
  - Royal blue (left loop)      : #3660F3  (range #2E51DA to #3860F3)
  - Electric cyan (right loop)  : #14F4F6  (range #14F7F6 to #15F4F7)
  - The loop has a blue-to-cyan gradient where the two sides meet.


------------------------------------------------------------------------------------------
 1. DELIVERABLE
------------------------------------------------------------------------------------------

  - Output: 1080x1920 vertical (9:16) MP4, H.264 High, 30 fps (or keep 60 fps if your
    pipeline handles it; motion blur must look the same either way), 16 to 20 Mbps, AAC
    320 kbps 48 kHz. Same length as the main video (about 68.5 s). Don't cut speech.
  - First crop out the black pillarbox bars, then scale the vertical picture to fill
    1080x1920.
  - RESOLUTION WARNING: the active picture is only about 592x1072, so filling 1080x1920 is
    already about 1.8x upscale. Before any punch-in, upscale the cropped picture with an AI
    upscaler (Real-ESRGAN, Topaz Video AI or similar) to at least 1080x1920, ideally
    2160x3840 as a working master. Keep digital punch-ins at 145% or less of the
    1080x1920 frame, and add a light sharpen plus 2-3% film grain to hide softness.
  - Safe zones for Reels/TikTok/Shorts: keep important text out of the bottom 320 px (caption
    and UI area), the top 160 px and the right 140 px (like/comment buttons). Big hero
    words MAY bleed off the left/right edges exactly like the reference does ("perfect",
    "but", "Agentic Ext...") as long as the word stays readable.


------------------------------------------------------------------------------------------
 2. STEP 1: WORD-LEVEL TIMING (do this before any design)
------------------------------------------------------------------------------------------

  - Transcribe the main video's audio with WORD-LEVEL timestamps (Whisper large-v3 with
    language=bn and word_timestamps=True, or forced alignment of the given script with
    WhisperX/MFA/aeneas).
  - Use the SCRIPT spelling (Section 9) on screen, never the ASR spelling. The ASR is only
    for timing.
  - Every word appears ON the frame it starts being spoken (0 to 2 frames early is fine,
    never late). That word-synced build-up is the core of the reference.
  - The timecodes in Section 8 are ESTIMATES measured from audio energy (accurate to about
    ±0.5 s). Always snap them to the real word timestamps.

  Measured speech phrases in the main video (start-end, in seconds; gaps are breaths):
  0.50-3.00 | 3.50-4.65 | 5.00-5.80 | 6.30-6.90 | 7.50-8.35 | 8.85-10.70 | 11.10-12.00 |
  12.40-13.45 | 13.80-17.60 | 18.05-22.85 | 23.25-24.35 | 24.85-25.80 | 26.30-31.20 |
  31.55-32.90 | 33.35-35.75 | 36.05-37.20 | 37.50-40.10 | 40.45-43.85 | 44.15-45.60 |
  45.90-53.20 | 53.50-61.10 | 61.40-65.15 | 65.45-66.10 | 66.40-67.40


------------------------------------------------------------------------------------------
 3. THE REFERENCE STYLE, DECODED (what you must replicate)
------------------------------------------------------------------------------------------

3.1 Two-weight, two-colour type system
  - SUPPORT words (most words): THIN/REGULAR weight, pure white, lowercase-feeling, medium
    size, very tight letter-spacing (tracking about -20 to -40), tight leading (about 85-90%).
  - HERO words (1-2 per phrase): ULTRA-BLACK/HEAVY weight, BRAND COLOUR (red in the reference,
    SetuChat blue here), HUGE (2-4x the support words, often 30-60% of the frame width or
    wider and bleeding off the frame), tracking -30 to -50, letters almost touching.
  - Occasionally a hero word is WHITE heavy instead of coloured, to vary the rhythm
    ("perfect.", "music,", "going,", "face, voice"). Ratio: about 70% brand-coloured
    heavies and 30% white heavies.
  - No boxes, no backgrounds and no strokes behind normal text. Only a very soft, low-opacity
    drop shadow (black, 25-35% opacity, 0 distance, 20-40 px blur) for separation.

3.2 Layout: words STACK and COLLIDE
  - Words of a phrase pile up in a loose, asymmetric cluster near the speaker's head and
    shoulders, never in a centred subtitle line.
  - Previous words of the same phrase STAY on screen while new words arrive, so the cluster
    grows word by word. The whole cluster clears (fast exit) at the phrase end or on a cut.
  - Words overlap each other and overlap the person. Small white words tuck into the gaps
    of big heavy words ("filmed" under "ever", "too" beside "ended", "it, of all" under
    "music,").
  - Mixed sizes and positions: some words sit high (above the head), some at shoulder level,
    some at the lower third. Alternate left-heavy and right-heavy clusters shot to shot.
  - Some lines sit on a slight angle or on an ARC (rotated -8 to +12 degrees, or set on a
    curved path).

3.3 Depth: text BEHIND the person (rotoscope/matte)
  - Big hero words often sit BEHIND the speaker: the head and hair overlap the letters
    ("shot", "simply", "same", "dialogue", "work/flow" in the reference). Small white words
    usually sit IN FRONT.
  - Build a clean person matte for the whole clip (Robust Video Matting, MediaPipe Selfie
    Segmentation, SAM 2 or After Effects Roto Brush 3). Feather 2-3 px, choke 1 px, and fix
    the hair edges. Use it on about 40% of the hero words.
  - Sometimes a word starts behind the person and passes in front during its animation
    (depth swap). Use this 3-4 times in the edit.

3.4 Signature animation presets (use these names in your build)
  A) MOTION-BLUR STRETCH-IN (most used, about 45% of words)
     Word enters from 120-250 px left/right/up, scaleX 160% -> 100%, directional blur
     80 px -> 0, opacity 0 -> 100. Duration 6-8 frames at 30 fps. Ease: expo-out
     (cubic-bezier(0.16, 1, 0.3, 1)). Turn on real motion blur (180-degree shutter).
     Reference: "but", "reshoot", "consistency", "motion", "keep", "going".
  B) POP/BOUNCE SCALE
     Scale 0% -> 112% (frame 5) -> 96% (frame 8) -> 100% (frame 10). Opacity 0 -> 100 in
     3 frames. Used for single support words and for the logo.
  C) 3D FLIP-IN
     Rotate X 90 -> 0 degrees (or Rotate Y -80 -> 0) with perspective, anchor at the
     baseline. 8-10 frames, ease-out back (overshoot 6%). Reference: "something",
     "doesn't".
  D) ARC/BEND
     The word is warped on an arc (bend +15 to +30%), like text on a cylinder, and slowly
     rotates 3-6 degrees while on screen. Reference: "ended", "generated", "dialogue",
     "consistency", "going,".
  E) MARQUEE SLIDE
     A giant heavy word (often two words) slides horizontally across the frame at constant
     speed (about 600-900 px/s) from off-screen right to past the left edge, bleeding both
     sides, behind the person. Reference: "Agentic Extend".
  F) LETTER-BY-LETTER SCATTER SPELL
     A hero word is built one grapheme at a time, each piece popping in at a different
     size/height/rotation around the person (+/-10 degrees, +/-40 px baseline jitter),
     2-3 frames apart. Reference: "E X T E N D". For Bangla, split by GRAPHEME CLUSTERS
     (never break a conjunct or vowel sign), e.g. এ | জে | ন্ট.
  G) OUTLINE ECHO
     The heavy filled word has 1-2 hollow outline copies (2-3 px white or cyan stroke, no
     fill) offset 20-60 px behind it, which drift away and fade. Reference: "ever".
  H) 3D EXTRUDED GLOW WORD
     White face, brand-coloured extruded depth (8-14 stacked copies stepping down/back),
     soft bloom. Reference: "scene". Use it once or twice for the biggest emotional words.
  I) PIXEL-GLITCH SQUARES
     Blocky square pixels in the brand colour flicker on for 4-8 frames around the opening
     words and on transitions. Reference: the red blocks around "Have you", and the red
     pixel block behind "this shot".
  J) EXITS
     Fast exits only: 4-6 frames of scale 100 -> 85%, opacity 100 -> 0 plus a 30-60 px
     directional blur, or a hard cut together with the shot change. Never slow fades.

3.5 Camera language
  - The reference uses many real shots: wide, high angle, close-up and B-roll. The main
    video is one static take, so SIMULATE the cuts with digital reframes on the upscaled
    master, hard-cut on word or phrase boundaries every 1.2 to 2.5 s. Use 4 framings:
       WIDE   = 100% (full 9:16 frame, chair and hands visible)
       MEDIUM = 118% (waist-up, centred on the chest)
       CLOSE  = 135% (chest-up, head in the upper third)
       PUNCH  = 145% (face and shoulders; use it for the hero beats)
  - Change the horizontal offset between consecutive framings (sometimes subject left,
    sometimes right) so the cuts feel like different cameras.
  - Inside each framing add a slow push of 100% -> 103% over the shot (ease in-out), and
    on hero words a quick 4-frame "impact zoom" of +4% with a 1-2 frame micro shake
    (6-10 px).
  - Transitions: mostly HARD CUTS. On 4-5 key moments use a whip-pan (12-frame directional
    blur slide) or a pixel-glitch cut (preset I). No cross-dissolves anywhere.

3.6 Colour grade and look (CRITICAL: the main footage is too bright)
  - The reference is dark, moody and cinematic, with warm practical lights, deep shadows and
    a slightly crushed black point. White text only pops because the background is dark.
  - Grade the main video toward that look while keeping skin natural:
       * Exposure -0.6 to -0.9 stops, highlights -40, whites -25, blacks -15, contrast +20.
       * Shadows/mids: cool steel/teal (a slight push toward #0E1A2E) to tie in the
         SetuChat blue. Keep skin warm and neutral (protect the skin tones).
       * Bring down the bright glass wall and white ceiling grid so it reads as a
         dark-grey/blue-grey environment, and keep the green of the ferns muted.
       * The white shirt must not clip: roll it off to about 85-90 IRE.
       * Vignette: 30-40% darkening at the edges, feathered wide.
       * A subtle "bloom/halation" on highlights (about 10%) and 2-3% fine film grain.
       * Optional: a soft cyan/blue practical-light glow (low-opacity radial gradient,
         #14F4F6 at 8-12%) near one edge of the background, like the warm lamps in the
         reference, but in brand colours.
  - On the "but (তবে)..." warning beat (Section 8, S18-S20), temporarily drop saturation
    by 30% and add a slightly heavier vignette, then return to normal at S21.

3.7 Small persistent elements (exactly like the reference)
  - Bottom-left, tiny (20-22 px, white 70% opacity, regular weight): "*In partnership with
    SetuChat". Do NOT use "Powered by". Visible the whole video except the final CTA shot.
  - Bottom-right corner, tiny SetuChat logo mark (about 40 px tall, white or original
    colours at 85% opacity), static, like the small invideo ghost icon in the reference.
  - From about 7.5 s, the reference shows a tiny 1-line caption sentence at the very bottom
    ("Invideo has changed the way I edit and shoot") and a tiny 1-line top sentence during
    the prompt-panel section. Copy that idea: tiny 18-22 px white 70% one-line "context
    lines" at the very top or bottom, ABOVE the platform safe area, in 3-4 places (texts in
    Section 8). They are not subtitles.
  - Both corner elements must sit inside the safe zone (raise them about 330 px from the
    bottom).

3.8 Sound design (the reference's audio could not be measured; follow standard practice
    for this style)
  - Keep the voice clean and dominant: -14 LUFS integrated, true peak -1 dB.
  - Light whoosh on every MOTION-BLUR STRETCH-IN hero word (not on every small word),
    a soft pop/click on POP entries and UI clicks, a deep sub-boom/riser-hit on 4-5 major
    beats (the hook at "কাজও", "আসল পার্থক্য", "অটোমেটেড", the "তবে" turn, and the
    "SetuChat" logo), and a short digital glitch on the pixel-glitch transitions.
  - Optional modern tech/lo-fi bed under the voice at -28 to -30 LUFS, ducked under speech.
  - SFX volume about -20 to -24 dB under the voice. Never cover a word.


------------------------------------------------------------------------------------------
 4. BRAND ADAPTATION (red -> SetuChat)
------------------------------------------------------------------------------------------

  Colour roles:
   - HERO HEAVY fill     : SetuChat Blue  #3660F3  (replaces the reference red)
       To read on the dark grade, give blue heavies a 1-2 px inner edge highlight of a
       lighter blue (#5B82FF), or a very soft outer glow of #14F4F6 at 15-20%, 12 px blur.
   - ACCENT / SECOND HERO : Electric Cyan  #14F4F6  (use on about 20-25% of the heavies,
       especially "AI" related words, glitch squares, outline echoes, UI highlights,
       cursor and loading ring)
   - SUPPORT TEXT         : Pure white #FFFFFF
   - GRADIENT (special)   : linear Blue #3660F3 -> Cyan #14F4F6 (left-to-right or
       top-to-bottom). Use it ONLY on the final "SetuChat" CTA word (like the reference's
       white-to-red "work/flow") and on 1-2 other top-priority words ("AI অটোমেশন").
   - UI panels             : near-black glass #0B0F1A at 80% opacity, 1 px border
       #FFFFFF at 18%, 22-28 px corner radius, soft blur behind (backdrop blur 20 px).
   - Never use red, orange, yellow or purple anywhere.

  Logo usage:
   - The logo PNG has a transparent background; use it as-is (blue and cyan infinity
     loop with a chat-bubble tail). Never recolour it, stretch it or add effects other than
     the animations described below.
   - Logo reveal at the CTA: POP/BOUNCE (preset B) + a quick cyan light sweep across
     it + 1 glitch frame, then hold.


------------------------------------------------------------------------------------------
 5. TYPOGRAPHY (BANGLA + LATIN)
------------------------------------------------------------------------------------------

  The reference uses a tight neo-grotesk (Helvetica Now/Inter-style): Black for heroes,
  Regular/Light for support. Match that feeling in Bangla:

   - Bangla HERO (heavy) : "Anek Bangla" ExtraBold/Bold (800/700), Expanded or Normal width
                            (best match for the chunky, wide reference heavies).
                            Fallback: "Noto Sans Bengali" Black (900), or "Hind Siliguri" Bold.
   - Bangla SUPPORT      : "Noto Sans Bengali" Light/Regular (300/400), or
                            "Hind Siliguri" Light/Regular.
   - Latin words (AI, SetuChat, stock, etc.): "Inter Display" / "Inter Tight", Black (900)
                            for heroes and Regular (400) for support. Match x-height optically
                            with the Bangla.
   - Tracking: support -10 to -25 (keep Bangla readable, so less negative than in Latin);
     heroes -20 to -40. Leading 85-95%.
   - CRITICAL: Bangla must be shaped correctly (HarfBuzz/complex-script shaping). Check
     every conjunct and vowel sign: ক্ত, ন্ত, স্ট, ন্ট, ন্ন, ক্য, র্থ, দ্ধ, ্য-ফলা, র-ফলা, রেফ, ি/ী/ে/ৈ/ো/ৌ
     placement. In After Effects, enable the "South Asian and Middle Eastern" text engine.
     In code (Remotion/HTML/Canvas), use real web fonts with proper shaping. Never render
     Bangla letter-by-letter as separate glyphs unless split by grapheme cluster.
   - Sizes on a 1080x1920 canvas (guide):
       support words      : 56-90 px
       secondary heavies  : 140-200 px
       hero heavies       : 220-420 px (can bleed off the frame)
       giant beats        : 450-650 px (one per 8-10 s; e.g. "আসল", "না", "SetuChat")
       tiny context lines : 18-22 px


------------------------------------------------------------------------------------------
 6. UI OVERLAY GRAPHICS (SetuChat versions of the reference UI moments)
------------------------------------------------------------------------------------------

  The reference has 3 kinds of UI moments: (1) a dashed-border clip box with a hand-drawn
  curved arrow, (2) a cursor clicking "Open editor" -> "Processing..." chat bubble, and
  (3) a small prompt panel at the left with a typed instruction, plus a floating clip
  frame with a finger-press loading circle. Build SetuChat equivalents in the SAME style
  (dark glass, thin white text, rounded corners, subtle shadow, slight 3D tilt of 4-8
  degrees, slow float of 6-10 px). Text inside UIs can be English or Bangla as written.

  UI-1  CHATBOT BUBBLE (S4): a Messenger-style chat. Customer bubble (white text on a dark
        grey bubble): "ডেলিভারি চার্জ কত?" Bot reply bubble (blue #3660F3): "১২০ টাকা।"
        Bubbles pop in (preset B) with a typing dots "..." loop between them. Shows: a
        chatbot only answers.
  UI-2  AGENT ACTION CHECKLIST (S5-S7): small panel "SetuChat Agent" with 3 rows that tick
        on one by one with cyan check marks: "✓ Decision", "✓ Tools", "✓ Task done". The
        cursor glides and clicks. Keep it small (about 40% of the frame width), placed
        beside the head, behind the hero words.
  UI-3  ORDER MESSAGE (S9): an incoming page message notification slides down from the
        top: "নতুন মেসেজ: আমি অর্ডার করতে চাই" with a small cart icon.
  UI-4  STOCK CHECK BOX (S10): a DASHED-BORDER rounded box (exactly like the reference
        timeline clip box, 2 px dashed white at 70%) around a mini product card "Stock: 24
        ✓ In stock", plus the HAND-DRAWN CURVED ARROW (white, 4 px, round caps, drawn on
        with trim-path in 10 frames) pointing from the box to the hero word.
  UI-5  ORDER FORM + PROCESSING (S11): a small form card where "নাম", "ঠিকানা" and
        "ফোন" fields auto-fill with a typing animation (the cursor clicks "Place order" ->
        a cyan "Processing..." bubble with a spinning loader, exactly like the reference's
        "Open editor -> Processing...").
  UI-6  COURIER BOOKED (S12): a toast card "Courier booked ✓  Tracking ID: SC-20481" with a
        small delivery-van icon sliding in from the right.
  UI-7  HUMAN HANDOFF (S21): a chat header "Transferring to human support..." with the
        circular LOADING RING (cyan, like the reference finger-press loader) completing,
        then a small avatar badge "Human Agent joined". The curved arrow re-appears
        pointing from the bot icon to the human icon.
  UI-8  PROMPT PANEL (S22-S23, optional): a small left-side panel like the reference
        prompt box, titled "SETUCHAT", with typed text: "Automate replies, orders,
        courier and support". "+" and "send" icon buttons at the bottom.

  UI rules: UIs appear for 1.2-3 s, always UNDER or BESIDE the hero words (words are
  layered on top or the person is between them), never covering the face. Enter with
  preset B or a 10-frame slide-up with blur. Exit with preset J.


------------------------------------------------------------------------------------------
 7. HERO WORD SELECTION LOGIC (already chosen in Section 8; follow it)
------------------------------------------------------------------------------------------
  - 1-2 heroes per phrase: the contrast word, the action word, the brand/product word, or
    the emotional word.
  - Recurring core words always get special treatment: "AI" (cyan or blue, Latin Black),
    "এজেন্ট", "চ্যাটবট", "পার্থক্য", "অটোমেটেড/অটোমেশন", "SetuChat".
  - Every other word of the line still appears on screen as white support text, word-synced.


------------------------------------------------------------------------------------------
 8. SHOT-BY-SHOT EDIT PLAN (snap all times to real word timestamps)
------------------------------------------------------------------------------------------
 Legend: [HERO-B] = heavy SetuChat Blue, [HERO-C] = heavy Cyan, [HERO-W] = heavy White,
         [HERO-G] = Blue->Cyan gradient, (sup) = thin white support words.
         Presets: A blur-stretch, B pop, C 3D flip, D arc/bend, E marquee, F scatter spell,
         G outline echo, H 3D extruded, I pixel glitch, J exit.

S1  | ~0.5-2.9 s | "আপনার AI শুধু কথা বলে নাকি কাজও করে?"   (HOOK, like "Have you ever filmed something but...")
    Framing: frame 0 starts on PUNCH (145%) with a pixel-glitch intro (I) of blue/cyan
      squares for 6 frames, then a hard cut to CLOSE at "কথা", then MEDIUM at "কাজও".
    Type: "আপনার" (sup, top-left, B) -> "AI" [HERO-C], giant Latin Black, centre-left,
      with OUTLINE ECHO (G): 2 hollow cyan outline copies drifting right, like "ever"
      -> "শুধু" (sup) tucked under it -> "কথা বলে" (sup, A from the left) -> "নাকি" (sup)
      -> "কাজও" [HERO-B] huge, bending on an ARC (D), BEHIND the person (matte), bleeding
      off the right edge -> "করে?" (sup, C flip). Cluster exits on the cut.
    SFX: glitch at frame 0, sub-boom on "কাজও".

S2  | ~3.5-4.7 s | "একটি AI এজেন্ট আর একটি চ্যাটবট,"   (like "needed to EXTEND it?")
    Framing: WIDE (100%), subject offset to the right, slow push.
    Type: "একটি AI" (sup, curved on a slight arc above the head) -> "এজেন্ট" [HERO-B]
      built with LETTER-BY-LETTER SCATTER SPELL (F): এ | জে | ন্ট, each cluster popping at a
      different height/rotation around his head, exactly like E-X-T-E-N-D
      -> "আর একটি" (sup) -> "চ্যাটবট," [HERO-W] heavy white, A from the right, lower third.

S3  | ~5.0-5.8 s (extend to ~6.2) | "পার্থক্য কী?"   (like "This shot was perfect.")
    Framing: hard cut to CLOSE, subject centred. 2-frame blue pixel-block glitch (I) behind
      the head on the cut.
    Type: "পার্থক্য" [HERO-B] GIANT (about 110% of the frame width, bleeding both sides),
      placed at head height BEHIND the person (his head covers part of the letters),
      entering with A. Then "কী?" [HERO-W] very large white, lower half, bleeding off the
      bottom edge like "perfect." (B pop). Impact zoom +4% on "কী?".

S4  | ~6.3-8.4 s | "একটা চ্যাটবট শুধুমাত্র প্রশ্নের উত্তর দেয়।"
    Framing: MEDIUM, subject left. UI-1 CHATBOT BUBBLE floats at the right side.
    Type: "একটা" (sup) -> "চ্যাটবট" (sup, white, medium) -> "শুধুমাত্র" [HERO-W] with heavy
      MOTION-BLUR STRETCH-IN (A) like "but" -> "প্রশ্নের" (sup) -> "উত্তর" [HERO-B] on an
      ARC (D) -> "দেয়।" (sup).
    Tiny context line at the bottom from here: "চ্যাটবট = শুধু উত্তর।  এজেন্ট = পুরো কাজ।"

S5  | ~8.85-10.7 s | "একটা এজেন্ট সিদ্ধান্ত নিতে পারে,"   (like "It's called Agentic Extend")
    Framing: CLOSE, subject right. UI-2 appears small at the top-left (like the reference's
      floating clip frame) and the cursor clicks it; the cyan LOADING RING spins at the
      click point.
    Type: "একটা এজেন্ট" (sup) -> "সিদ্ধান্ত" [HERO-B] as a giant MARQUEE SLIDE (E), sliding
      right-to-left behind the person, bleeding both edges, at mid-frame height
      -> "নিতে পারে," (sup, lower).

S6  | ~11.1-12.0 s | "টুলস ব্যবহার করতে পারে"
    Framing: PUNCH, subject centred. Whip-pan transition into it.
    Type: "টুলস" [HERO-C] with 3D FLIP-IN (C), above the head -> "ব্যবহার করতে পারে" (sup)
      stacking word by word under it. The UI-2 "✓ Tools" row ticks.

S7  | ~12.4-17.6 s | "এবং আপনার হয়ে কাজটি সম্পন্ন করতে পারে।"
    Framing: MEDIUM -> (cut at "কাজটি") CLOSE.
    Type: "এবং আপনার হয়ে" (sup, word by word, top-left cluster) -> "কাজটি" [HERO-W] (A)
      -> "সম্পন্ন" [HERO-B] huge, ARC (D), behind the person. "✓ Task done" ticks.

S8  | ~18.0-19.5 s | "এটাই আসল পার্থক্য।"
    Framing: hard cut to PUNCH + impact zoom and micro shake.
    Type: "এটাই" (sup) -> "আসল" GIANT BEAT [HERO-H]: 3D EXTRUDED GLOW (H), white face with
      blue extrusion and cyan bloom, centre, partly behind the head -> "পার্থক্য।" (sup,
      large white, lower). Sub-boom.

S9  | ~19.5-22.8 s | "ধরুন একটা কাস্টমার আপনার পেইজে অর্ডার করল।"
    Framing: WIDE (100%), subject left. UI-3 ORDER MESSAGE slides down at the top.
    Type: "ধরুন" (sup, B) -> "একটা কাস্টমার" (sup) -> "আপনার পেইজে" (sup) -> "অর্ডার"
      [HERO-B] (A from the right, bleeding off the right edge) -> "করল।" (sup).

S10 | ~23.2-24.4 s | "একটা AI এজেন্ট স্টক চেক করবে,"   (like the dashed timeline-box shot)
    Framing: MEDIUM, subject right. UI-4 dashed box + curved arrow at the left.
    Type: "একটা AI এজেন্ট" (sup, "AI" in cyan regular) -> "স্টক চেক" [HERO-C] stacked on
      2 lines (স্টক / চেক), A -> "করবে," (sup).

S11 | ~24.8-28.0 s | "নিজেই নাম ঠিকানা নিয়ে অর্ডার প্লেস করবে"   (like "Open editor -> Processing...")
    Framing: cut to an EXTREME tight insert-feel: UI-5 fills about 70% of the frame for
      1.2 s (the speaker darkened and blurred behind it, 15 px gaussian), then cut back to
      CLOSE with the UI shrunk at the side.
    Type: "নিজেই" [HERO-W] (B) -> "নাম ঠিকানা নিয়ে" (sup, word-synced while the fields fill)
      -> "অর্ডার প্লেস" [HERO-B] (A) -> "করবে" (sup).

S12 | ~28.0-30.1 s | "এমনকি কুরিয়ারও পর্যন্ত বুক করবে।"   (like "up to 30 seconds")
    Framing: WIDE, subject right. UI-6 COURIER toast at the left-bottom.
    Type: "এমনকি" (sup, small, above) -> "কুরিয়ারও" [HERO-B] huge chunky block at the left
      (stacked like "30 / seconds", with "পর্যন্ত" as small white heavy under it)
      -> "বুক করবে।" (sup, ARC D like "and the consistency").

S13 | ~30.1-31.9 s | "সবচেয়ে মজার বিষয় হলো"
    Framing: CLOSE, subject left. Pixel-glitch cut (I) into this shot.
    Type: "সবচেয়ে" (sup) -> "মজার" [HERO-C] (3D FLIP C, with a subtle wobble) -> "বিষয় হলো"
      (sup).

S14 | ~31.9-35.1 s | "কখন কী করতে হবে এটা আপনাকে বলে দিতে হবে না।"
    Framing: MEDIUM -> PUNCH on "না।".
    Type: words stack fast, word-synced, in a growing cluster on the right: "কখন কী" (sup)
      "করতে হবে" (sup) "এটা আপনাকে" (sup) "বলে দিতে" [HERO-W] (A) "হবে" (sup) -> "না।"
      GIANT BEAT [HERO-B] (about 600 px), slamming in with B + impact zoom + shake, behind
      the person.

S15 | ~35.1-37.2 s | "কাস্টমার কী চাচ্ছে এটা বুঝে"
    Framing: CLOSE, subject right.
    Type: "কাস্টমার" (sup) "কী চাচ্ছে" (sup) "এটা" (sup) -> "বুঝে" [HERO-B] with OUTLINE ECHO
      (G).

S16 | ~37.5-40.1 s | "AI নিজেই নিজের সিদ্ধান্ত নিতে পারবে।"   (like "You get the same face, voice and the same motion.")
    Framing: MEDIUM, subject right, a different offset from S15.
    Type: "AI" (sup, top) -> "নিজেই" [HERO-B] behind the head -> "নিজের" [HERO-W] stacked
      under it (front) -> "সিদ্ধান্ত" [HERO-W] stacked under that -> "নিতে পারবে।" (sup,
      A). Heavy words overlap each other vertically like "same / face, / voice".

S17 | ~40.1-42.6 s | "এভাবেই পুরো বিষয়টি অটোমেটেড হয়ে যাবে।"   (like "all of it generated.")
    Framing: PUNCH, subject centred.
    Type: "এভাবেই" (sup) "পুরো বিষয়টি" (sup) -> "অটোমেটেড" [HERO-G gradient] on a big ARC
      (D) across the lower half, slowly rotating -> "হয়ে যাবে।" (sup). Sub-boom.

S18 | ~42.6-45.6 s | "তবে সবকিছুই AI এর হাতে ছেড়ে দেওয়া যায় না।"   (TONE SHIFT)
    Framing: WIDE, desaturate 30% and add a heavier vignette (Section 3.6). A tiny 3-frame
      glitch on "তবে".
    Type: "তবে" [HERO-W] alone, big, 0.4 s (B) -> cluster: "সবকিছুই" (sup) "AI এর হাতে"
      (sup) "ছেড়ে দেওয়া" (sup) -> "যায় না।" [HERO-B] (A).

S19 | ~45.9-51.0 s | "একটি AI বুঝবে যদি কাস্টমার অসন্তুষ্ট হয় বা কোনো জটিল প্রক্রিয়া সামনে চলে আসে"
    Framing: CLOSE -> (cut at "জটিল") MEDIUM.
    Type: "একটি AI" (sup) -> "বুঝবে" [HERO-C] (C) -> "যদি কাস্টমার" (sup) -> "অসন্তুষ্ট"
      [HERO-B] with a 4-frame shake on entry -> "হয় বা কোনো" (sup) -> "জটিল" [HERO-W] with a
      slight RGB-split jitter for 6 frames -> "প্রক্রিয়া সামনে চলে আসে" (sup, ARC D).

S20 | ~51.0-53.8 s | "তাহলে কখন মানুষের সাহায্য প্রয়োজন হবে।"
    Framing: PUNCH. Saturation returns to normal over 12 frames.
    Type: "তাহলে কখন" (sup) -> "মানুষের" [HERO-H 3D EXTRUDED] (second and last use) ->
      "সাহায্য প্রয়োজন হবে।" (sup, stacking).

S21 | ~53.8-57.8 s | "তখন সে সরাসরি হিউম্যান সাপোর্টের কাছে কনভারসেশনটি পাঠিয়ে দিবে।"
    Framing: MEDIUM, subject right. UI-7 HUMAN HANDOFF at the left with the curved arrow.
    Type: "তখন সে সরাসরি" (sup) -> "হিউম্যান সাপোর্ট" [HERO-B] as a MARQUEE SLIDE (E),
      second use -> "এর কাছে" (sup) -> "কনভারসেশনটি" (sup, A) -> "পাঠিয়ে দিবে।" (sup).
    Tiny context line: "জটিল কেস? → সরাসরি হিউম্যান সাপোর্টে।"

S22 | ~57.8-61.9 s | "আপনার ব্যবসায় শুধু রিপ্লাই নয়, পুরো কাজই অটোমেট করতে চান,"
    Framing: CLOSE -> (cut at "পুরো") WIDE. Optional UI-8 PROMPT PANEL at the left.
    Type: "আপনার ব্যবসায়" (sup) "শুধু" (sup) -> "রিপ্লাই" [HERO-W], then a cyan strike-through
      line wipes across it in 6 frames on "নয়," -> "পুরো কাজই" [HERO-B] (A, behind the
      person) -> "অটোমেট" [HERO-C] (D) -> "করতে চান," (sup).
    Tiny top context line: "Replies + Orders + Courier + Support — সব অটোমেটেড।"

S23 | ~61.9-64.9 s | "তাহলে পরিচিত হন চ্যাটবট নয় AI অটোমেশনের সাথে।"
    Framing: PUNCH, subject left.
    Type: "তাহলে পরিচিত হন" (sup) -> "চ্যাটবট নয়" (sup, white, with a quick strike-through)
      -> "AI অটোমেশন" [HERO-G gradient], huge, ARC D, behind the head -> "এর সাথে।" (sup).

S24 | ~64.9-68.47 s (to the end) | "কানেক্ট হোন SetuChat এর সঙ্গে।"   (CTA, like "Comment 'Extend' and I'll send you the workflow")
    Framing: CLOSE talking head (like the reference ending), subject centred, slow push
      100 -> 106% to the end. Hide the bottom-left partnership line in this shot.
    Type: "কানেক্ট হোন" (sup, top-right, B, word by word) -> "SetuChat" [HERO-G] GIANT,
      split on 2 lines "Setu" / "Chat" (like "work" / "flow") at the upper-left, BEHIND the
      head, with the blue->cyan gradient (A, then a slight 3D tilt) -> "এর সঙ্গে।" (sup,
      right side, stacked like "I'll and send").
    At ~66.5 s (after "সঙ্গে"): the SetuChat LOGO pops in (B) at the lower-centre, about
      260 px wide, with a cyan light sweep. Below it, in small white Inter Regular, 40 px:
      "SetuChat — AI Automation for your business". Hold until the end. Final 6 frames:
      a tiny pixel-glitch (I) out.
    SFX: whoosh on "SetuChat", pop + soft riser-hit on the logo.


------------------------------------------------------------------------------------------
 9. FULL SCRIPT (on-screen spelling source)
------------------------------------------------------------------------------------------
আপনার AI শুধু কথা বলে নাকি কাজও করে? একটি AI এজেন্ট আর একটি চ্যাটবট, পার্থক্য কী? একটা
চ্যাটবট শুধুমাত্র প্রশ্নের উত্তর দেয়। একটা এজেন্ট সিদ্ধান্ত নিতে পারে, টুলস ব্যবহার করতে পারে এবং
আপনার হয়ে কাজটি সম্পন্ন করতে পারে। এটাই আসল পার্থক্য। ধরুন একটা কাস্টমার আপনার পেইজে অর্ডার
করল। একটা AI এজেন্ট স্টক চেক করবে, নিজেই নাম ঠিকানা নিয়ে অর্ডার প্লেস করবে এমনকি কুরিয়ারও
পর্যন্ত বুক করবে। সবচেয়ে মজার বিষয় হলো কখন কী করতে হবে এটা আপনাকে বলে দিতে হবে না। কাস্টমার
কী চাচ্ছে এটা বুঝে AI নিজেই নিজের সিদ্ধান্ত নিতে পারবে। এভাবেই পুরো বিষয়টি অটোমেটেড হয়ে যাবে।
তবে সবকিছুই AI এর হাতে ছেড়ে দেওয়া যায় না। একটি AI বুঝবে যদি কাস্টমার অসন্তুষ্ট হয় বা কোনো
জটিল প্রক্রিয়া সামনে চলে আসে তাহলে কখন মানুষের সাহায্য প্রয়োজন হবে। তখন সে সরাসরি হিউম্যান
সাপোর্টের কাছে কনভারসেশনটি পাঠিয়ে দিবে। আপনার ব্যবসায় শুধু রিপ্লাই নয়, পুরো কাজই অটোমেট
করতে চান, তাহলে পরিচিত হন চ্যাটবট নয় AI অটোমেশনের সাথে। কানেক্ট হোন SetuChat এর সঙ্গে।

CTA = the last sentence: "কানেক্ট হোন SetuChat এর সঙ্গে।"


------------------------------------------------------------------------------------------
 10. RHYTHM AND DENSITY RULES
------------------------------------------------------------------------------------------
  - Average shot length 1.5-2.0 s (about 35-40 reframes/cuts in 68 s). Never hold one
    framing longer than 3 s.
  - Something must move or change at least every 0.5 s (a new word, a cut, a UI step,
    an impact zoom).
  - Maximum 6-8 words visible at once. The cluster clears at phrase boundaries.
  - Mix the presets: never use the same entry preset on 3 consecutive hero words.
  - About 40% of heroes behind the person, 60% in front.
  - Giant beats (450 px+) only at: "AI" (S1), "পার্থক্য" (S3), "আসল" (S8), "না।" (S14),
    "অটোমেটেড" (S17), "SetuChat" (S24).
  - Face visibility: hero text may overlap the head/hair (behind or in front), but must
    NEVER cover both eyes and the mouth at the same time for more than 6 frames.


------------------------------------------------------------------------------------------
 11. SUGGESTED BUILD PIPELINE (code-based or After Effects)
------------------------------------------------------------------------------------------
  1. Crop the pillarbox -> AI upscale -> stabilise lightly if needed -> colour grade (3.6).
  2. Generate the person matte for the full clip (RVM/SAM 2/Roto Brush) and export it as an
     alpha video.
  3. Word timestamps (Section 2) -> a JSON of {word, start, end, phrase_id}.
  4. Build the text layers from the JSON with the presets in 3.4 (Remotion/React +
     framer-style springs, or AE with expressions/Animators). Layer order per shot: graded
     background -> BEHIND-text layer -> person cut-out (from the matte) -> FRONT-text
     layer -> UI layer (where specified) -> corner brand elements -> grain.
  5. Apply the reframes/cuts (3.5) to the background AND the matte together, so masking stays
     aligned.
  6. Motion blur on all moving text (shutter 180, 16 samples).
  7. Sound design (3.8), mix, loudness normalise.
  8. Render (Section 1).


------------------------------------------------------------------------------------------
 12. QA CHECKLIST (verify before delivering)
------------------------------------------------------------------------------------------
  [ ] It looks like the reference at a glance: dark cinematic grade, thin white + heavy
      colour words, stacked/colliding clusters, words behind the person, motion-blur entries.
  [ ] No red anywhere. Only #3660F3, #14F4F6, white, and the blue->cyan gradient.
  [ ] Every spoken word appears on screen, synced to its start (0 to 2 frames early).
  [ ] On-screen spelling matches the script exactly; all Bangla conjuncts and vowel signs
      render correctly (no broken or dotted-circle glyphs).
  [ ] Mattes are clean (no halo or chattering hair edges) in all behind-the-person shots.
  [ ] Punch-ins never look blurry or pixelated (upscale done, max 145%).
  [ ] Text stays inside the platform safe zones (except intentional edge bleeds of heroes).
  [ ] No cross-dissolves, no slow fades, no subtitle bars, no emoji stickers.
  [ ] UI overlays (UI-1 to UI-7) appear in the right shots and never cover the face.
  [ ] The CTA "কানেক্ট হোন SetuChat এর সঙ্গে।" plus the logo end card is clear and held
      to the end.
  [ ] Voice clean at -14 LUFS, SFX never masking words.
  [ ] Output 1080x1920, about 68.5 s, H.264 MP4.

END OF PROMPT