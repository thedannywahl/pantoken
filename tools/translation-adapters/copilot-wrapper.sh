#!/usr/bin/env bash
# Adapts the translation adapter's stdin-based interface to GitHub Copilot CLI's positional-arg
# interface. The adapter always appends -p as the last arg; strip it and forward the rest (e.g.
# --model), then pass the prompt as Copilot CLI's own -p argument (its "programmatic mode").
prompt=$(cat)
# stdin is closed from /dev/null so the CLI can never block waiting on interactive input.
# Only the response belongs in translation catalogs, not model-selection banners or terminal colors.
copilot "${@:1:$#-1}" --silent --no-color -p "$prompt" </dev/null
