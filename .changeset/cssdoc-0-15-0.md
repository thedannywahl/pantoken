---
"@pantoken/docs": patch
---

Upgraded the `@cssdoc/*` toolchain to 0.15.2 and adopted `@cssdoc/cli` as the repository's single
cssdoc lint instance. Stylelint remains for its 24 core CSS correctness rules, which the CLI does not
cover. The CLI is invoked with `--max-warnings 0` so cssdoc violations remain CI failures.
