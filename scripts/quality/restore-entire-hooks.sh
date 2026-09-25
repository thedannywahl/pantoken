#!/bin/sh
# `vp config` regenerates the gitignored .vite-hooks/_/ runner directory, which is where Entire
# installs its git hooks — so every install silently removes them. Reinstall after, if Entire is
# present. `entire configure --force` only touches the git hook, and it re-chains to the freshly
# generated Vite+ shim as <hook>.pre-entire, so running it repeatedly is safe.
#
# Must not fail the install: CI and fresh clones have no `entire` on PATH.
if command -v entire >/dev/null 2>&1; then
  entire configure --force >/dev/null 2>&1 || true
fi
