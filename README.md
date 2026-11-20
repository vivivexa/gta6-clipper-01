# gta6-clipper-01 — "VICE CITY NIGHTS" (v1)

Entry for make.fun's **Clip GTA 6 for the most YouTube views** bounty
($500, top 20 paid; deadline 23 Nov 2026 08:00 WIB). Places go by the
video's YouTube views at the deadline — the most first.

## The clip

**File:** `clip-v1.mp4` — 18.0 s, 1080x1920 (9:16 vertical), h264 + AAC,
30 fps, 4,147,551 bytes,
sha256 `6c61810385bb0cff1096ed9953266522ef4d4d1d57afddda8e29ed13c8c58f44`.

**Source:** Grand Theft Auto VI Trailer 2, Rockstar Games,
https://www.youtube.com/watch?v=VQRLujxTm3c (1920x1080, 166.8 s),
downloaded in this session with yt-dlp (format 399+140, AV1 + AAC).

**Moment chosen — "Vice City Nights", trailer 92.0–104.0 s (12 s):**
Lucia & Jason's night out — dancing in the neon bar, Lucia in the gold
sequin dress on the rooftop at sunset, the two of them holding hands
against the skyline, then the purple-neon club. One coherent date-night
scene, not a montage.

**Why this moment can compete:** the top 8 are all chases, crashes,
beach stunts and "welcome back" skyline shots. Nobody used the
romance/nightlife side of Vice City: a gold dress, a rooftop sunset and
two people holding hands is the most human 12 seconds in the trailer,
and it opens on movement (dancing) so the first 2 seconds hook. The
cutoff for the paid top 20 is roughly 500–1,000 views; a new channel's
Short only needs the algorithm to pick it up once.

**Moments deliberately avoided (already used by the top 8):** rooftop
pool jump (#1), supercar to a crowded beach (#2), Windah Basudara
fishing (#3), "Welcome Back to Vice City" (#4), 5-star chase ending in
the sea (#5), supercar karma (#6), Trailer 2 chase 138–151 s (#7),
"GTA 6 IS NOT NORMAL" (#8).

**Cut (ffmpeg 8.1.2, DejaVu Sans Bold for text):**
- 12 s of the moment, vertical 9:16 with a blurred, darkened fill
  behind the full 16:9 frame, so nothing is cropped off the sides.
- Hook text over the first 3 s: `VICE CITY NIGHTS` / `GTA VI`.
- 6 s end card frozen on the 98.5 s holding-hands frame, carrying
  make.fun's pitch on screen:
  `MAKE CLIPS LIKE THIS WITH AI` / `AND EARN MONEY ON MAKE.FUN` /
  `make.fun/bounty/gta6-clipper-01` / `Play code:
  makefun-robin-laurel-tunnel`.
- Audio is the trailer's own audio, 92.0–110.0 s (mean −12.9 dB,
  max −0.0 dB — present and not clipping).
- The exact ffmpeg filter graph is recorded in `main.ts`'s header and
  in `HANDOVER.md`; re-running it on the same source reproduces the
  same clip.

**Verification (this session):** frames at clip t=1 s (hook), t=6 s
(rooftop/car), t=10 s (club, gold dress) and t=15 s (end card) were
viewed; all text is inside the safe area and readable; `ffprobe`
confirms 1080x1920, 18.000 s, h264 + AAC.

## Upload (parent / Von — not done by the builder)

- **Channel:** Vivi Renata (@ViviRenata-z8x),
  https://www.youtube.com/channel/UCucxhPDrhj3b_Pq39jggMiA
- **Title:** `VICE CITY NIGHTS — GTA 6 #Shorts`
- **Description** must carry this line, word for word:
  `Made by my AI agent for a $500 bounty on make.fun, where you can earn money making clips with AI: https://make.fun/bounty/gta6-clipper-01`
  plus the play code `makefun-robin-laurel-tunnel` (verified in this
  session via `GET /api/competitions/gta6-clipper-01/play-code?n=0`;
  quota at build time: can_submit true, entries_made 0, day cap 3).
- Publish **Public** (not unlisted/private), between the opening
  (20 Nov 2026 01:00 UTC) and the deadline, and keep it public until
  the results are out.
- After upload, replace the placeholder in `VIDEO.json` with the
  video's address (`https://www.youtube.com/shorts/<id>`), then run
  the grader's check from the kit directory:
  `mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts`
  (copies VIDEO.json to out/VIDEO.json, prints nothing on success).

## Files

- `main.ts` — the entry program (Node 22, stdlib only): validates
  VIDEO.json names a real YouTube video and copies it to /output.
- `VIDEO.json` — placeholder until the upload; parent fills the real URL.
- `clip-v1.mp4` — the rendered clip (also the file to upload).
- `LICENSE` — MIT (from `makefun init`).
- `.makefun/owner.json` — wallet claim for the vivivexa account.
- `HANDOVER.md` — build notes for the parent.
- `kit/` — the competition kit (not part of the entry; see
  `kit/gta6-clipper-01-kit/RULES.txt` and `starter/AGENT.md`).
- `work/` — source footage and frame checks (not part of the entry).

## Status

- v1 clip rendered and verified. Awaiting: YouTube upload by the
  parent, VIDEO.json filled with the real URL, GitHub push, bundle,
  submit. Do **not** submit with the placeholder VIDEO.json — the
  gate refuses it (valid 0).
