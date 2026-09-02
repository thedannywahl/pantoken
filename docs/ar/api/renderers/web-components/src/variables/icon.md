[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / icon

# متغير: icon

> `const` **icon**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

`&lt;instui-icon&gt;` — حرف SVG مضمن من مجموعة أيقونات pantoken. الخاصية `name` تختار
الشكل، `size` (أي طول CSS، الافتراضي `1em`) تحدد حجمه، `color` (أي لون CSS) تلوّنه، و
`margin` تضيف مسافة حوله (كلمات مفتاحية في InstUI مثل `small`). يعرض الـ SVG في DOM خفيف
DOM، محدد الحجم/اللون عبر أنماط مضمنة على المضيف، لذا يرث `currentColor` مثل النص.

## مثال

```html
<instui-icon name="arrow-left" margin="small"></instui-icon>
<instui-icon name="star" size="1.5rem" color="gold" margin="small"></instui-icon>
```
