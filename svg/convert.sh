#!/bin/sh

for F in *.svg
do
  P=`echo $F | sed -e 's/\.svg/.pdf/'`
  svg2pdf $F $P
done
