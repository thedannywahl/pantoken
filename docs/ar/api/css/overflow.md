# CSS: overflow

`.--overflow-x-hidden` — `overflow-x`/`overflow-y` كصفوف قابلة للتركيب وعالمية — `.--overflow-x-&lt;value&gt;` / `.--overflow-y-&lt;value&gt;` — قابلة للاستخدام مباشرة أو مُسلسَلة على أي مكوّن.

**المصدر:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/overflow/index.ts)

## الاستخدام

```css
@import "@pantoken/components/utilities.css";
```

## أمثلة

```html
<div class="--overflow-y-auto">…</div>
```

## المعدّلات

| معدّل | الوصف |
| --- | --- |
| `.--overflow-x-auto` | الانسياب-أفقي: auto. |
| `.--overflow-x-clip` | الانسياب-أفقي: clip. |
| `.--overflow-x-hidden` | الانسياب-أفقي: hidden. |
| `.--overflow-x-scroll` | الانسياب-أفقي: scroll. |
| `.--overflow-x-visible` | الانسياب-أفقي: visible. |
| `.--overflow-y-auto` | الانسياب-عمودي: auto. |
| `.--overflow-y-clip` | الانسياب-عمودي: clip. |
| `.--overflow-y-hidden` | الانسياب-عمودي: hidden. |
| `.--overflow-y-scroll` | الانسياب-عمودي: scroll. |
| `.--overflow-y-visible` | الانسياب-عمودي: visible. |

