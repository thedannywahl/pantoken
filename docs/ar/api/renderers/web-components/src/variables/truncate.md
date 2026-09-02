[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / truncate

# متغير: truncate

> `const` **truncate**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

`&lt;instui-truncate&gt;` — يقيد النص المُدرَج إلى عدد ثابت من الأسطر مع الحذف (ellipsis). `lines`
يقبل عددًا صحيحًا موجبًا أو `auto`. يعيّن الرقم الخاصية المخصصة `--lines` مباشرةً.
`auto` تحسب عدد الأسطر من ارتفاع المُضيف المتاح وتطبّق ذلك كـ `--lines`.
اترك `lines` لاقتطاع سطر واحد.

## مثال

```html
<instui-truncate lines="2">A long description that will be clamped to two lines…</instui-truncate>
```
