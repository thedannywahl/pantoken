---
"@pantoken/components": patch
---

Move the `button` component's static rules to a `.css` source file (`button.css`), and switch its
emitted selectors from flat `.instui-button.-modifier` chains to a `@scope (.instui-button) { & }`
block. Classes, modifiers, and behavior are unchanged; only the emitted selector shape differs.
