---
"@pantoken/utils": minor
"@pantoken/components": minor
"@pantoken/interactions": patch
---

`@pantoken/components`: added a `gap` utility (`.instui-gap-<step>`, component-attached like margin/padding) and a fully long, word-spelled spelling for every margin/padding/gap class (`-margin-bottom-small` alongside `-mb-sm`), both component-attached (including `view`). Every component and the `view` utility now document wildcard `@modifier -m*`/`-p*`/`-gap*` families so consumer-side cssdoc lint (`@cssdoc/eslint-plugin`'s `valid-class-usage`) doesn't flag a chained spacing/gap modifier as unknown.

`@pantoken/utils`: exported the shared spacing scale (`SPACING_STEPS`, `SPACING_AUTO_STEP`) so `@pantoken/components` and `@pantoken/interactions` share one source instead of two hand-maintained copies.

`@pantoken/interactions`: `resolveSpace`'s keyword table is now built from the shared scale (no behavior change).
