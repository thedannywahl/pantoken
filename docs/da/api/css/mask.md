# CSS: mask

`.instui-mask` — En overlay i strømmen, der fylder sin positionerede forælder og centrerer sit indhold — f.eks. en spinner over et kort. For en modal, foretrækkes en native `&lt;dialog&gt;` (dens `::backdrop` er masken). Hver en af disse modifikatorer er også tilgængelig globalt (bare eller kædet på enhver anden komponent) — se den `mask` globale utility.

**Kilde:** [mask.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/mask/mask.css)

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/mask.css";
```

## Examples

```html
<div style="position: relative">
  <div class="instui-mask">
    <span class="instui-spinner"></span>
  </div>
</div>
```

## Modifiers

| Modifier       | Description                                            |
| -------------- | ------------------------------------------------------ |
| `.-blur`       | Sløring hvad der er bag masken med en backdrop-filter. |
| `.-fullscreen` | Fast til viewport, der dækker det med et højt z-index. |

## Tokens consumed

| Token                                      | Type      | Value                                                     |
| ------------------------------------------ | --------- | --------------------------------------------------------- |
| `--instui-component-mask-background-color` | `<color>` | `light-dark(rgba(255,255,255,0.75), rgba(28,34,43,0.75))` |
