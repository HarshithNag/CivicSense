#!/bin/bash
set -e
RES=/home/claude/civic-sense-app/android/app/src/main/res
SRC=/home/claude/civic-sense-app/icon-src/adaptive-fg.svg

cd "$RES"
for f in $(find . -iname "splash.png"); do
  dims=$(identify -format "%wx%h" "$f")
  w=$(echo "$dims" | cut -dx -f1)
  h=$(echo "$dims" | cut -dx -f2)
  short=$(( w < h ? w : h ))
  seal_size=$(( short * 34 / 100 ))
  rsvg-convert -w "$seal_size" -h "$seal_size" "$SRC" -o /tmp/seal-tmp.png
  convert -size "${w}x${h}" xc:"#0b1f3a" /tmp/seal-tmp.png -gravity center -composite "$f"
done
echo "done"
identify "$RES/drawable-port-xxxhdpi/splash.png"
