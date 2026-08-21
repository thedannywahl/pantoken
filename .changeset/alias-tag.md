---
"@pantoken/components": patch
---

Adopt cssdoc's `@alias` tag for modifiers that are pure renames (no behavior change), reserving
`@deprecated` for true deprecations from the color/spacing normalization work. `-toggle`,
`-show-border`, `-has-shadow-false`, `-size-small`, `-type-new-error`, `-should-animate-on-mount`, the
`--value-now`/`--value-max` custom properties, and the responsive long-form/device-name breakpoint
classes are now documented as `@alias` instead of `@deprecated`. Avatar's `-color-accent*`, alert's
`-variant-*`, and progress(-circle)'s `-meter-color-*` remain `@deprecated`. All aliased modifiers keep
their functional CSS twin; only the generated docs badge changes (blue "Alias" vs. red "Deprecated").
