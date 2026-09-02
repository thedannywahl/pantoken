[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / truncate

# 변수: truncate

> `const` **truncate**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">알파</span>

`&lt;instui-truncate&gt;` — clamps slotted text to a fixed number of lines with an ellipsis. `lines`
accepts a positive integer or `auto`. A number sets the `--lines` custom property directly.
`auto` computes a line count from the host's available height and applies that as `--lines`.
Omit `lines` for single-line truncation.

## 예제

```html
<instui-truncate lines="2">A long description that will be clamped to two lines…</instui-truncate>
```
