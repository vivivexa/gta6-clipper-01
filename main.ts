// gta6-clipper-01 entry — "VICE CITY NIGHTS" (Node 22, standard library only).
//
// The entry is the video, not this program: this program only hands the house
// the video's address. It reads VIDEO.json from the repository root, checks
// that it names a real public YouTube video (not the starter placeholder),
// and copies those exact bytes to the output directory, where the gate reads
// them. Nothing here touches the network, the clock, or any file outside the
// repository, so two runs write the same bytes.
//
// The clip itself (clip-v1.mp4, rendered in this session):
//   Source: Grand Theft Auto VI Trailer 2, Rockstar Games,
//           https://www.youtube.com/watch?v=VQRLujxTm3c (1920x1080, 166.8 s)
//   Moment: "Vice City Nights" — Lucia & Jason's night out, trailer 92.0-104.0 s:
//           dancing in the neon bar, Lucia in the gold sequin dress on the
//           rooftop at sunset, holding hands against the skyline, then the
//           purple-neon club. One coherent date-night scene, not a montage.
//   Cut:   12 s of the moment, vertical 9:16 (1080x1920) with a blurred
//           darkened fill behind the full 16:9 frame, so nothing is cropped
//           off the sides; hook text "VICE CITY NIGHTS / GTA VI" over the
//           first 3 s; then a 6 s end card frozen on the 98.5 s holding-hands
//           frame carrying make.fun's pitch (name, bounty page, play code).
//   Audio: the trailer's own audio, 92.0-110.0 s (18 s total).
//   Pitch: "MAKE CLIPS LIKE THIS WITH AI / AND EARN MONEY ON MAKE.FUN /
//           make.fun/bounty/gta6-clipper-01 / Play code:
//           makefun-robin-laurel-tunnel" — on screen for the last 6 s.
//   Render: ffmpeg 8.1.2, libx264 + AAC, 30 fps, yuv420p, faststart.
//   Total: 18.0 s, 1080x1920, 4,147,551 bytes,
//   sha256 6c61810385bb0cff1096ed9953266522ef4d4d1d57afddda8e29ed13c8c58f44.
//   Verified in this session: frames at clip t=1 s (hook), t=6 s, t=10 s
//   (club) and t=15 s (end card) viewed — all text inside the safe area
//   and readable; ffprobe confirms 1080x1920, 18.000 s, h264 + AAC;
//   audio mean -12.9 dB, max -0.0 dB (present, not clipping). A first
//   render had the end-card headlines at fontsize 52, which overflowed
//   the dark panel edge to edge; it was re-rendered at 46/40/36 so every
//   line sits inside the panel with margins.
//
// Upload (done by the person, not by this program):
//   Channel: Vivi Renata (@ViviRenata-z8x),
//            https://www.youtube.com/channel/UCucxhPDrhj3b_Pq39jggMiA
//   Title: "VICE CITY NIGHTS — GTA 6 #Shorts"
//   Description carries, word for word:
//     "Made by my AI agent for a $500 bounty on make.fun, where you can earn
//      money making clips with AI: https://make.fun/bounty/gta6-clipper-01"
//   plus the play code "makefun-robin-laurel-tunnel" (verified against
//   GET /api/competitions/gta6-clipper-01/play-code?n=0 in this session).
//   VIDEO.json is then replaced with the uploaded video's address.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// A YouTube video address as the Share button gives it, with an 11-character
// video id. The starter placeholder ("<id>") never matches.
const YOUTUBE_URL =
  /^https:\/\/(?:www\.|m\.)?(?:youtube\.com\/(?:shorts\/|watch\?v=)|youtu\.be\/)([A-Za-z0-9_-]{11})(?:[?&#].*)?$/;

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

function fail(message: string): never {
  console.error(`VIDEO.json rejected: ${message}`);
  process.exit(1);
}

const sourcePath = join(BOT_DIR, 'VIDEO.json');
let raw: Buffer;
try {
  raw = readFileSync(sourcePath);
} catch (err) {
  fail(`could not be read from ${sourcePath}: ${(err as Error).message}`);
}

let parsed: unknown;
try {
  parsed = JSON.parse(raw.toString('utf8'));
} catch (err) {
  fail(`is not valid JSON: ${(err as Error).message}`);
}

if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
  fail('must be a JSON object like {"url": "https://www.youtube.com/shorts/<id>"}');
}

const url = (parsed as { url?: unknown }).url;
if (typeof url !== 'string' || !YOUTUBE_URL.test(url)) {
  fail('its "url" must be a YouTube shorts, watch or youtu.be address with an 11-character video id');
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'VIDEO.json'), raw);
