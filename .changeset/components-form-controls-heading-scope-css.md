---
"@pantoken/components": patch
---

Move the `text-area`, `simple-select`, `number-input`, `input-group`, and `heading` components'
rules to static `.css` source files, inlining the previously-shared `fieldControlBase`/
`inputFacadeBase`/`headingLevelRules` chrome as literal declarations. Emitted selectors switch to
`@scope (.instui-<component>) { & }` blocks. Classes and modifiers are unchanged; `input-group` also
gains documented `@part` entries for its `.before`/`.after` content slots.
