---
"@pantoken/docs": patch
---

Fix inconsistent heading/paragraph spacing on the Agent Tools page: `instui-heading` and
`instui-text` don't carry their own margin, so section intros, the hero, and doc-tab link cards were
leaning on ambient (and inconsistent) browser/`vp-doc` margins. Every heading/paragraph pair now zeroes
its own margin (`--m-0`) and gets spacing from an explicit `--gap-*` utility on its flex wrapper instead.
