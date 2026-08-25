---
"@pantoken/components": patch
"@pantoken/plugin-layouts": patch
"@pantoken/plugin-custom-components": patch
---

Fix cssdoc consumer-side lint incorrectly flagging `@global` utility modifiers (e.g. `--p-lg`,
`--mt-2xl`, `--mx-none` from the spacing/gap/layout/etc. utilities) as `unknown-modifier` when chained
onto a component outside `@pantoken/components`' own scope. The utilities are authored in `.ts`, so
their doc comments only ever existed in the unminified `generated/utilities.css` — which no
`cssdoc.jsonc` referenced as a `providers` entry. Wired it into the root config and the `layouts`/
`custom-components` configs alongside the existing `_records.css` entry. Also removed
`modifierConvention`/`inlineComments` re-declarations in `layouts`/`custom-components` that were
already inherited from the root config.
