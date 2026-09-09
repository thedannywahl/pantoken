---
"@pantoken/scaffold-base": minor
---

feat: render wrapper insertion points as `data-slot` divs instead of `<slot>`

`renderWrapperContainer`/`getWrapperContext` previously emitted a literal `<slot
name="...">` element for each optional insertion point (header, filters,
content, trailing, panel). `<slot>` only has real behavior inside a shadow-DOM
custom element — none of pantoken's scaffold templates render into one, so the
tag did nothing there. Insertion points now render as `<div data-slot="...">`
for both the `"html"` and `"jsx"` formats.

Also fixes a bug where a compound selector like `slot[name="content"].main`
silently dropped its trailing `.main`/`.trailing`/`.panel` class — that class is
now recovered and applied to the rendered `<div>`.
