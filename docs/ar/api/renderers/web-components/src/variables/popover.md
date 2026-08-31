[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / popover

# Variable: popover

> `const` **popover**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-popover&gt;` — سطح عائم. مثل `&lt;instui-context-view&gt;`، المضيف هو native `[popover]` (الطبقة العليا + الرفض الخفيف)، لذا يمكن لزر light-DOM `popovertarget` تبديله حسب الهوية.
يذهب المحتوى في الفتحة الافتراضية.

## Example

```html
<button popovertarget="menu">Options</button> <instui-popover id="menu">…</instui-popover>
```
