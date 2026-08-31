# CSS: maskglobal

`.--mask-overlay` — En global, dobbelt kopi af `mask` komponentens overlay-modifikatorer — `--mask-overlay`, `--mask-fullscreen`, `--mask-blur` — kan bruges bare eller kædet på enhver komponent uden omslutning i et `.instui-mask` element.

**Kilde:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/mask/index.ts)

## Usage

```css
@import "@pantoken/components/utilities.css";
```

## Examples

```html
<button class="instui-button --mask-overlay">…</button>
```

## Modifiers

| Modifier             | Description                                              |
| -------------------- | -------------------------------------------------------- |
| `.--mask-blur`       | Sløring hvad der er bag masken med en backdrop-filter.   |
| `.--mask-fullscreen` | Fast til viewport, der dækker det med et højt z-index.   |
| `.--mask-overlay`    | Den fulde mask-overlay (position, centrering, baggrund). |

## Tokens consumed

| Token                                      | Type      | Value                                                     |
| ------------------------------------------ | --------- | --------------------------------------------------------- |
| `--instui-component-mask-background-color` | `<color>` | `light-dark(rgba(255,255,255,0.75), rgba(28,34,43,0.75))` |
