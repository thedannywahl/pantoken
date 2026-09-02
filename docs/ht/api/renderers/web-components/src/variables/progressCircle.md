[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / progressCircle

# Varyab: progressCircle

> `const` **progressCircle**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

`&lt;instui-progress-circle&gt;` — a circular indicator backed by native `&lt;progress&gt;` or `&lt;meter&gt;` semantics.

`value-now`/`value` drive `--value`, while `min` and `value-max`/`max` drive the range. A zero
minimum renders a native `&lt;progress&gt;`; a non-zero minimum renders `&lt;meter&gt;`. Add the boolean
`should-animate` attribute to animate from zero on mount; `animation-delay` is a millisecond delay.
`label` overrides the accessible name (which otherwise defaults to the percentage).

## Egzanp

```html
<instui-progress-circle value-now="40" value-max="60" should-animate></instui-progress-circle>
```
