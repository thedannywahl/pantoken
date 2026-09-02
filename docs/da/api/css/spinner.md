# CSS: spinner

`.instui-spinner` — En animeret indlæsningsring; giv den rolle="status" og en aria-label.

`-color-inverse` gentegner kun det animerede øvre grænsesegment, ikke hele sporet, så det læses stadig korrekt på et mørkt kort uden at have brug for en separat sporfarve.

**Kilde:** [spinner.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/spinner/spinner.css)

## Tilgængelighed

Giv spinnerulen rolle="status" og en aria-label, så skærmlæsere annoncerer det som en live indlæsningsstatus.

## Brug

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/spinner.css";
```

## Demo

```demo
self:spinner
```

## Eksempler

```html
<span class="instui-spinner" role="status" aria-label="Loading"></span>
```
### Inverse color -nocard
```html
<div class="instui-view instui-card -background-primary-inverse">
  <span class="instui-spinner -color-inverse" role="status" aria-label="Loading"></span>
</div>
```

## Modifikatorer

| Modifikator | Beskrivelse |
| --- | --- |
| `.-color-inverse` | På en mørk overflade. |
| `.-size-large` | Stor. Langt-form alias af `-size-lg`. |
| `.-size-lg` | Stor. |
| `.-size-sm` | Lille. |
| `.-size-small` | Lille. Langt-form alias af `-size-sm`. |
| `.-size-x-small` | Ekstra lille. Langform-alias af `-size-xs`. |
| `.-size-xs` | Ekstra lille. |

## Animationer

| Animation | Beskrivelse |
| --- | --- |
| `pantoken-spinner-rotate` | — |

## Forbrugte tokens

| Token | Type | Værdi |
| --- | --- | --- |
| `--instui-component-spinner-color` | `<color>` | `light-dark(#2871AF, #7FB4F1)` |
| `--instui-component-spinner-inverse-color` | `<color>` | `#ffffff` |
| `--instui-component-spinner-spinner-size-lg` | `<length>` | `4.5rem` |
| `--instui-component-spinner-spinner-size-md` | `<length>` | `3.5rem` |
| `--instui-component-spinner-spinner-size-sm` | `<length>` | `2rem` |
| `--instui-component-spinner-spinner-size-xs` | `<length>` | `1rem` |
| `--instui-component-spinner-stroke-width-lg` | `<length>` | `0.75em` |
| `--instui-component-spinner-stroke-width-md` | `<length>` | `0.5em` |
| `--instui-component-spinner-stroke-width-sm` | `<length>` | `0.375em` |
| `--instui-component-spinner-stroke-width-xs` | `<length>` | `0.25em` |
| `--instui-component-spinner-track-color` | `<color>` | `light-dark(rgba(35,68,101,0.1), rgba(255,255,255,0.1))` |

