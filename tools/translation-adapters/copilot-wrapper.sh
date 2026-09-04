#!/usr/bin/env bash
# Adapts the translation adapter's stdin-based interface to GitHub Copilot CLI's positional-arg
# interface. The adapter always appends -p as the last arg; strip it and forward the rest (e.g.
# --model), then pass the prompt as Copilot CLI's own -p argument (its "programmatic mode").
prompt=$(</dev/stdin)
# stdin is closed from /dev/null so the CLI can never block waiting on interactive input.
copilot "${@:1:$#-1}" -p "$prompt" </dev/null
