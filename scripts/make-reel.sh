#!/usr/bin/env bash
# Cuts the homepage hero reel from the client clips made by record-work.mjs:
# two seconds of each, hard cuts, 10 s loop. Output public/work/reel.mp4 + reel.jpg.
#   bash scripts/make-reel.sh
set -euo pipefail
cd "$(dirname "$0")/../public/work"
# key:start-second — the stretch of each clip that shows the site best.
CUTS=(jellyceeblends:2.2 cleanpuppy:0.4 tree4less:0.2 classeskin:0.6 getkickz:0.3)
inputs=(); filters=""; i=0
for c in "${CUTS[@]}"; do
  inputs+=(-ss "${c#*:}" -t 2 -i "${c%%:*}.mp4")
  filters+="[$i:v]setpts=PTS-STARTPTS,fps=30,scale=1280:800[v$i];"
  i=$((i+1))
done
for ((n=0; n<i; n++)); do filters+="[v$n]"; done
filters+="concat=n=$i:v=1:a=0[out]"
ffmpeg -y -loglevel error "${inputs[@]}" -filter_complex "$filters" -map "[out]" \
  -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart -an reel.mp4
ffmpeg -y -loglevel error -i reel.mp4 -frames:v 1 -q:v 4 reel.jpg
ls -la reel.mp4 reel.jpg
