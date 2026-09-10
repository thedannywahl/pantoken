---
"@pantoken/docs": patch
---

fix(docs): scope `vitepress-plugin-llms` to the English locale and one build pass, and raise the docs deploy heap ceiling

The plugin previously excluded non-root locales only from the `llms.txt`/`llms-full.txt` aggregates,
but still ran its per-file transform on every translated page during both VitePress build passes
(client + SSR, the latter discarding its own output). With ~44 locales at full translated content,
that was the dominant cost behind an out-of-memory docs deploy failure.

- Move the non-root-locale exclusion to the global `ignoreFiles` option so the plugin skips
  translated pages entirely instead of just omitting them from the generated indexes.
- Restrict the plugin to the client build via `apply`, since it already skips its own SSR-build
  output — this avoids paying for the walk twice.
- Raise the docs deploy workflow's `NODE_OPTIONS --max-old-space-size` from 8192 to 14336 as
  additional headroom for the first full-locale seed.
