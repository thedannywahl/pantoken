[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / tray

# Variable: tray

> `const` **tray**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-tray&gt;` — لوحة مرسومة إلى حافة عرض، مدعومة بـ native `[popover]` (الطبقة العليا +
الرفض الخفيف). يعيّن `placement` إلى `-placement-&lt;value&gt;` (مثل `start`، `end`، `top`، `bottom`) و
`size` إلى `-size-&lt;value&gt;`؛ يقوم زر light-DOM `popovertarget` بتبديله حسب الهوية. يذهب المحتوى في
الفتحة الافتراضية.

## Example

```html
<button popovertarget="nav">Menu</button>
<instui-tray id="nav" placement="start" size="small">…</instui-tray>
```
