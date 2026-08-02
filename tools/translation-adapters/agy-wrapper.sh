#!/usr/bin/env bash
# Adapts the translation adapter's stdin-based interface to agy's positional-arg interface.
# The adapter always appends -p as the last arg; strip it and forward the rest (e.g. --model).
prompt=$(</dev/stdin)
agy "${@:1:$#-1}" -p "$prompt"
