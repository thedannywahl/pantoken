---
"@pantoken/docs": patch
---

Phase 0 spike (localization-engine plan): proved the offset-splice extraction technique — identify
translatable ranges via the mdast AST, substitute by absolute byte offset, never re-stringify — is
lossless on the real generated docs corpus. `docs/scripts/offset-splice-spike.ts` collects leaf text
ranges (`text`/`inlineCode`/`code`), recurses into ` ```md ` fences (contributing only children's
offsets, never the fence's own), and asserts the resulting ranges are disjoint before splicing.

Verified: round-trip identity holds for all 812 generated API pages and all guide pages (including
files containing an `html`-lang fence, the `embedded:shell` agent-bootstrap prompt, and a `mermaid`
diagram); a fixture with an `html` fence nested inside an `md` fence round-trips correctly; and
`assertDisjoint`/`splice` reject a deliberately broken extractor that includes both a parent fence's
own range and one of its recursed children's ranges.

Adds `unified` and `remark-parse` as new catalog entries (joining the already-cataloged `remark-gfm`
and `unist-util-visit`).
