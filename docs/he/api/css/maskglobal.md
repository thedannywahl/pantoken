# CSS: maskglobal

`.--mask-overlay` — A global, dual copy of the `mask` component's overlay modifiers — `--mask-overlay`, `--mask-fullscreen`, `--mask-blur` — usable bare or chained onto any component, without wrapping in a `.instui-mask` element.

**Source:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/mask/index.ts)

## שימוש

```css
@import "@pantoken/components/utilities.css";
```

## דוגמאות

```html
<button class="instui-button --mask-overlay">…</button>
```

## מחליפים

| מחליף | תיאור |
| --- | --- |
| `.--mask-blur` | Blur what's behind the mask with a backdrop-filter. |
| `.--mask-fullscreen` | Fixed to the viewport, covering it at a high z-index. |
| `.--mask-overlay` | The full mask overlay (position, centring, background). |

## אסימוני צריכה

| אסימון | סוג | ערך |
| --- | --- | --- |
| `--instui-component-mask-background-color` | `<color>` | `light-dark(rgba(255,255,255,0.75), rgba(28,34,43,0.75))` |

