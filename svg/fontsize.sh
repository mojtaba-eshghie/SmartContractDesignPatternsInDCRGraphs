#!/bin/sh

for F in *.svg
do
  sed -i -e 's/12px/15px/g' $F
done
