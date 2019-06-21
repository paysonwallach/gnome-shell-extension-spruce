#!/usr/bin/env bash

cd ../spruce@paysonwallach.com

pot=org.gnome.shell.extensions.spruce.pot

touch $pot
xgettext -j *.js -o $pot
xgettext -j schemas/*.xml -o $pot

for locale_lang in locale/*; do
    po=$locale_lang/LC_MESSAGES/org.gnome.shell.extensions.spruce.po
    echo $po
    msgmerge --backup=off -U $po $pot
    msgfmt $po -o ${po%po}mo
done

rm $pot