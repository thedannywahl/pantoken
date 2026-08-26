---
"@pantoken/components": patch
---

Add `@remarks` to 18 top-level components that previously only had a
`@summary` (billboard, close-button, context-view, file-drop, heading,
img, in-place-edit, input-group, number-input, pill, popover,
range-input, simple-select, spinner, text, text-area, text-input,
tooltip). Each remark adds composition rules, non-obvious states, or
distinctions from similar-sounding components — richer text for
downstream semantic search over component docs, and clearer guidance
for anyone reading the generated CSS API reference.
