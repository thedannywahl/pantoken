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
| `.--overflow-x-auto` | overflow-x: auto. |
| `.--overflow-x-clip` | overflow-x: clip. |
| `.--overflow-x-hidden` | overflow-x: hidden. |
| `.--overflow-x-scroll` | overflow-x: scroll. |
| `.--overflow-x-visible` | overflow-x: visible. |
| `.--overflow-y-auto` | overflow-y: auto. |
| `.--overflow-y-clip` | overflow-y: clip. |
| `.--overflow-y-hidden` | overflow-y: hidden. |
| `.--overflow-y-scroll` | overflow-y: scroll. |
| `.--overflow-y-visible` | overflow-y: visible. |

