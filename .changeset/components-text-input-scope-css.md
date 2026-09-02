---
"@pantoken/components": patch
---

Move the `text-input` component's rules to a fully static `.css` source file (`text-input.css`),
inlining the shared field-control chrome as literal `var(--instui-component-text-input-*)`
declarations instead of interpolating them at build time. Emitted selectors switch to
`@scope (.instui-text-input) { & }`. Also adds an explicit `-size-md` modifier as a first-class
twin of the (default) medium base rule. Classes and modifiers are otherwise unchanged.
