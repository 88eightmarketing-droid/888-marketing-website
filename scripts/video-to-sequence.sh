#!/usr/bin/env bash
# Drop-in for a real AI-generated clip (Kling / Veo / Higgsfield…): exports N evenly spaced WebP frames
# for ScrollSequence. usage: scripts/video-to-sequence.sh clip.mp4 public/sequences/name 180 1280
set -euo pipefail
in="$1"; out="$2"; n="${3:-180}"; w="${4:-1280}"
mkdir -p "$out"
dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$in")
fps=$(python3 -c "print($n/$dur)")
ffmpeg -v error -y -i "$in" -vf "fps=$fps,scale=$w:-2" -start_number 0 -c:v libwebp -quality 72 "$out/%03d.webp"
ls "$out" | wc -l
