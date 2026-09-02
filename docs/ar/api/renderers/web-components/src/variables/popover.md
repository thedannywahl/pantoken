[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / popover

# متغير: popover

> `const` **popover**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

`&lt;instui-popover&gt;` — سطح عائم. مثل `&lt;instui-context-view&gt;`، المضيف هو أصلي
`[popover]` (الطبقة العلوية + الإغلاق بالخلفية)، لذا يمكن لزر `popovertarget` في DOM خفيف تبديله بالمعرّف.
المحتوى يوضع في الفتحة الافتراضية.

## مثال

```html
<button popovertarget="menu">Options</button>
<instui-popover id="menu">…</instui-popover>
```
