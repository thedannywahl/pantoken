---
"@pantoken/pendo": minor
---

Add an `instui-banner` class prefix that gives Pendo popovers and surveys the banner surface, icon
swatch, and spacing while keeping their overlay drop shadow. It is keyed on the class rather than on
Pendo's `data-layout`, so it covers PMF surveys (which arrive with no layout value) and NPS surveys
(`bannerNpsSurvey`) alike. Alerts are unaffected.

Fix survey styling never applying in the scoped build. The stylesheet is wrapped in
`@scope ([class*="instui"]._pendo-step-container)`, where a bare compound selector does not match the
scoping root — and `._pendo-guide-walkthrough_` sits on that root. Survey rules now use
`:is(:scope, [class*="instui"])`, matching the convention the banner and alert blocks already used.

Fix rating scales clipping out of reach. The number-scale and NPS radio groups are laid out with
flexbox but could not wrap, so in a narrow guide the high end of the scale overflowed and, inside a
banner's clipped card, became unselectable.
