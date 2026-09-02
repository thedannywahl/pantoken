[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / truncate

# Variable: truncate

> `const` **truncate**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-truncate&gt;` — clamps slotted text to a fixed number of lines with an ellipsis. `lines`
accepts a positive integer or `auto`. A number sets the `--lines` custom property directly.
`auto` computes a line count from the host's available height and applies that as `--lines`.
Omit `lines` for single-line truncation.

## Exemple

```html
<instui-truncate lines="2">A long description that will be clamped to two lines…</instui-truncate>
```
