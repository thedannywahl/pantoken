# CSS: overflow

`.--overflow-x-hidden` — `overflow-x`/`overflow-y` com a classes compostables, globals — `.--overflow-x-&lt;value&gt;` / `.--overflow-y-&lt;value&gt;` — utilitzables aïllades o encadenades a qualsevol component.

**Font:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/overflow/index.ts)

## Ús

```css
@import "@pantoken/components/utilities.css";
```

## Exemples

```html
<div class="--overflow-y-auto">…</div>
```

## Modificadors

| Modificador | Descripció |
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

