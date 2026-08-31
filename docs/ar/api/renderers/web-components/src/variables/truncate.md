[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / truncate

# Variable: truncate

> `const` **truncate**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-truncate&gt;` — يقيد النص المدرج إلى عدد ثابت من السطور بنقاط حذف. يقبل `lines`
عدداً صحيحاً موجباً أو `auto`. يعيّن الرقم خاصية `--lines` المخصصة مباشرة.
`auto` يحسب عدد الأسطر من الارتفاع المتاح للمضيف ويطبقه كـ `--lines`.
احذف `lines` لقطع سطر واحد.

## Example

```html
<instui-truncate lines="2">A long description that will be clamped to two lines…</instui-truncate>
```
