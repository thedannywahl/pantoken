[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / tooltip

# Pembolehubah: tooltip

> `const` **tooltip**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-tooltip&gt;` — wraps a slotted trigger and shows a `.tip` bubble (from the `tip` attribute)
on hover/focus. `placement` maps to `-placement-&lt;value&gt;` (e.g. `bottom`, `end`); `show-delay` and
`hide-delay` (ms, default 0) gate the reveal/hide, and Escape dismisses it. JS owns the timing:
a `.-show`-gated `!important` override neutralizes the pure-CSS `:hover`/`:focus-within` auto-show
so the delay actually applies.

## Contoh

```html
<instui-tooltip tip="Placement bottom" placement="bottom" show-delay="200">
  <button class="instui-button -color-secondary">Hover me</button>
</instui-tooltip>
```
