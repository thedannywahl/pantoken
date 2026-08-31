[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / progress

# Variable: progress

> `const` **progress**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`<instui-progress>` — a horizontal indicator backed by native `<progress>` or `<meter>` semantics.

`value-now`/`value` drive `--value`, while `min` and `value-max`/`max` drive the range. A zero
minimum renders a native `<progress>`; a non-zero minimum renders `<meter>`. Add the boolean
`should-animate` attribute to transition meter changes over half a second. `variant` maps the
component to `-color-<variant>` and `label` supplies its accessible name.

## Example

```html
<instui-progress value-now="40" value-max="60" variant="success" should-animate></instui-progress>
```
