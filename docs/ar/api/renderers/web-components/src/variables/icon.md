[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / icon

# Variable: icon

> `const` **icon**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-icon&gt;` — رمز SVG مضمن من مجموعة أيقونات pantoken. سمة `name` تختار
الرمز، `size` (أي طول CSS، الافتراضي `1em`) يحجمه، `color` (أي لون CSS) يلونه، و
`margin` يضيف مسافة حوله (كلمات أساسية InstUI مثل `small`). يرسم SVG إلى light DOM الخاص به، بحجم/ملون عبر أنماط مضمنة على host، لذا يرث `currentColor` مثل النص.

## Example

```html
<instui-icon name="arrow-left" margin="small"></instui-icon>
<instui-icon name="star" size="1.5rem" color="gold" margin="small"></instui-icon>
```
