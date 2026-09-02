[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / tray

# متغير: tray

> `const` **tray**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

`&lt;instui-tray&gt;` — لوحة مثبتة على حافة نافذة العرض، مدعومة بواسطة `[popover]` الأصلية (طبقة علوية +
إغلاق بالخفة). `placement` تُطابق `-placement-&lt;value&gt;` (مثل `start`, `end`, `top`, `bottom`) و
`size` إلى `-size-&lt;value&gt;`; زر `popovertarget` في DOM الخفيف يبدّلها بواسطة المعرف. يوضع المحتوى في الفتحة الافتراضية.

## مثال

```html
<button popovertarget="nav">Menu</button>
<instui-tray id="nav" placement="start" size="small">…</instui-tray>
```
