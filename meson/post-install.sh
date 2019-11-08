#!/usr/bin/env bash

GSCHEMA_DIR="${DESTDIR}/${GSCHEMADIR}"

glib-compile-schemas "${GSCHEMA_DIR}"
