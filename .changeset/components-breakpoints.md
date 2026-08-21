---
"@pantoken/components": minor
---

`responsiveUtilitiesCss`/`responsive`: the breakpoint scale now comes from
`--instui-component-tray-width-*` instead of a hand-typed `sm`/`md`/`lg`/`xl` @ 30/48/64/80rem
scale — **breaking**: values shift to `xs`/`sm`/`md`/`lg`/`xl` @ 16/20/30/48/62em (a new `xs` tier,
and every existing tier's threshold moves down one step). Each scale tier now also emits a
long-form-spelling alias (`x-small`…`x-large`) and a device-name alias
(`mobile`/`phablet`/`tablet`/`laptop`/`desktop`) alongside the short name — e.g.
`.instui-hidden-max-lg`, `.instui-hidden-max-large`, and `.instui-hidden-max-laptop` are equivalent.

Also adds two new, unscaled breakpoint tiers for the main content area's max-width — `content` and
`content-full-width` — themed (1100px/1580px in `rebrand`, 59.25em in `canvas`/`canvasHighContrast`).

Adds `-show-max-<bp>`/`-show-min-<bp>` (and their `-cq-show-*` container-query twins) as the inverse
of `-hidden-max-*`/`-hidden-min-*`: hidden by default (`display: none`), then `revert`ed back to
their natural display only inside the matching breakpoint range. Same short/long-form/device-name
alias scheme as the hide classes.

Long-form and device-name classes (`-hidden-max-small`, `-hidden-max-phablet`, etc.) are now
documented as `@deprecated` aliases of the short name (`-hidden-max-sm`), matching the codebase's
existing `-size-small`/`-size-sm` convention. Every `-hidden-max-*`/`-hidden-min-*` class (and its
`-cq-` container-query twin) is individually documented, the `@media`/`@container` breakpoint
thresholds describe the boundary itself (not the hide behavior), and the breakpoint scale is now
also exposed as inspectable `--pantoken-bp-*` `@property` custom properties (informational only —
they don't affect the compiled thresholds) whose scale-tier values consume the real
`--instui-component-tray-width-*` tokens.

`breadcrumb.link`'s trail-collapse breakpoint now uses the `@pantoken/plugin-theme-custom-media`
`--breakpoint-large-down` alias instead of a hardcoded `max-width: 48rem` (still 48em/`lg`/`large`
under the new scale, so this specific component's behavior is unchanged).
