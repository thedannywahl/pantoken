# CSS: overflow

`.--overflow-x-hidden` — `overflow-x`/`overflow-y` as composable, global classes — `.--overflow-x-&lt;value&gt;` / `.--overflow-y-&lt;value&gt;` — usable bare or chained onto any component.

**Source:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/overflow/index.ts)

## 使用法

```css
@import "@pantoken/components/utilities.css";
```

## 例

```html
<div class="--overflow-y-auto">…</div>
```

## 修飾子

| 修飾子 | 説明 |
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

