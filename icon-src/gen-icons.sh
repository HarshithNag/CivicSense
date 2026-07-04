#!/bin/bash
set -e
cd /home/claude/civic-sense-app/icon-src

declare -A LEGACY=( [mdpi]=48 [hdpi]=72 [xhdpi]=96 [xxhdpi]=144 [xxxhdpi]=192 )
declare -A FG=( [mdpi]=108 [hdpi]=162 [xhdpi]=216 [xxhdpi]=324 [xxxhdpi]=432 )

RES=/home/claude/civic-sense-app/android/app/src/main/res

for d in mdpi hdpi xhdpi xxhdpi xxxhdpi; do
  size=${LEGACY[$d]}
  fgsize=${FG[$d]}
  rsvg-convert -w "$size" -h "$size" icon-source.svg -o "$RES/mipmap-$d/ic_launcher.png"
  rsvg-convert -w "$size" -h "$size" icon-source.svg -o "/tmp/tmp-$d.png"
  convert "/tmp/tmp-$d.png" \( -size "${size}x${size}" xc:none -fill white -draw "circle $((size/2)),$((size/2)) $((size/2)),0" \) -alpha off -compose CopyOpacity -composite "$RES/mipmap-$d/ic_launcher_round.png"
  rsvg-convert -w "$fgsize" -h "$fgsize" adaptive-fg.svg -o "$RES/mipmap-$d/ic_launcher_foreground.png"
done

echo "done"
identify "$RES/mipmap-xxxhdpi/ic_launcher.png" "$RES/mipmap-xxxhdpi/ic_launcher_round.png" "$RES/mipmap-xxxhdpi/ic_launcher_foreground.png"
