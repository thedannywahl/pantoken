---
"@pantoken/components": minor
---

`breadcrumb` now renders as a semantic `<nav><ol><li class="link">…</li></ol></nav>` trail instead
of a flat `<nav><span class="link">…</span></nav>` list, matching the WAI-ARIA breadcrumb pattern.
**Breaking for existing markup**: the flex layout, gap, and font-size that used to live on
`.pfx-breadcrumb` now live on `.pfx-breadcrumb > ol`, and each crumb must be an `<li>` instead of a
`<span>`. `breadcrumb.link` and the `link` component now document how to pair `.pfx-breadcrumb` with
the `responsive` utility's `-hidden-max-md`/`-hidden-min-md` classes and a `.pfx-link` to reproduce
InstUI's "Breadcrumb becomes a Link under ~768px" behavior in pure CSS.
