---
"@pantoken/components": patch
---

Move the `view` component's static base rule and cssdoc block to a `.css` source file (`view.css`),
switching its emitted selector to `@scope (.instui-view) { & }`. The programmatically-generated
background/border/shadow/display/position/overflow/cursor modifier rules are merged in via
`appendGenerated()` so they land inside the same `@scope` block. Classes and modifiers are unchanged.
