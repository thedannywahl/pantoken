[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / progress

# Breytur: progress

> `const` **progress**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-progress&gt;` — a horizontal indicator backed by native `&lt;progress&gt;` or `&lt;meter&gt;` semantics.

`value-now`/`value` drive `--value`, while `min` and `value-max`/`max` drive the range. A zero
minimum renders a native `&lt;progress&gt;`; a non-zero minimum renders `&lt;meter&gt;`. Add the boolean
`should-animate` attribute to transition meter changes over half a second. `variant` maps the
component to `-color-&lt;variant&gt;` and `label` supplies its accessible name.

## Dæmi

```html
<instui-progress value-now="40" value-max="60" variant="success" should-animate></instui-progress>
```
