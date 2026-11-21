#!/bin/zsh
# Main Street, after dark (footage/PROMPTS.md). Re-run from the repo root: zsh footage/build.sh
#
# In:  footage/out/NN-name.mp4  (Grok clip with the real work composited by scripts/composite-screen.py;
#      shot 1 has no screen, so it is the raw master copied over)
# Out: footage/out/street.mp4 (1600x900, 24 fps) and public/seq/street/NNN.webp (12 per second of film)
#
# Each shot: its best stretch (START/LEN below, set after watching), a slow push, then one grade over
# everything (the Classé film recipe: lifted blacks, cool shadows / warm highlights, halation, grain,
# a touch of softening to take the AI edge off), joined with 0.8 s dissolves.
set -e
cd "${0:A:h}/.."
O=footage/out; W=1600; H=900; X=0.8
SHOTS=(01-dark 02-classe 03-puppy 04-van 05-truck 06-chair 07-counter)
START=(0 0.5 0.5 0.5 0.5 0.5 0.5)
LEN=(4 3.6 3.6 3.6 3.6 3.6 4.4)

grade() { echo "unsharp=5:5:-0.35,eq=contrast=1.04:saturation=0.9,colorbalance=rs=-0.03:gs=-0.005:bs=0.05:rh=0.04:gh=0.01:bh=-0.03,curves=all='0/0.03 0.25/0.2 0.6/0.6 1/0.96',split[$1g0][$1g1];[$1g1]curves=all='0/0 0.72/0 1/1',gblur=sigma=26,colorchannelmixer=rr=1:gg=0.82:bb=0.66[$1h];[$1g0][$1h]blend=all_mode=screen:all_opacity=0.2,vignette=PI/4.4,noise=alls=7:allf=t,format=yuv420p"; }
push() { echo "scale=$((W*2)):-2,zoompan=z='1+0.06*on/($1*24)':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=1:s=${W}x${H}:fps=24"; }

ins=(); fc=""; i=0
for s in $SHOTS; do
  ins+=(-i $O/$s.mp4)
  fc+="[$i:v]trim=${START[$((i+1))]}:$(( ${START[$((i+1))]} + ${LEN[$((i+1))]} )),setpts=PTS-STARTPTS,fps=24,$(push ${LEN[$((i+1))]}),$(grade s$i)[v$i];"
  i=$((i+1))
done
# Chain the dissolves.
prev="v0"; off=0
for (( k=1; k<${#SHOTS}; k++ )); do
  off=$(( off + ${LEN[$k]} - X ))
  fc+="[$prev][v$k]xfade=transition=fade:duration=$X:offset=$off[x$k];"
  prev="x$k"
done
fc+="[$prev]format=yuv420p[out]"
ffmpeg -v error -y $ins -filter_complex "$fc" -map "[out]" -an -c:v libx264 -crf 17 -preset slow $O/street.mp4

rm -rf public/seq/street && mkdir -p public/seq/street
ffmpeg -v error -y -i $O/street.mp4 -vf "fps=12" -c:v libwebp -quality 72 -start_number 0 public/seq/street/%03d.webp
echo "frames: $(ls public/seq/street | wc -l)  — set FRAMES in src/site/street/MainStreet.tsx"
