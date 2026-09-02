# CSS: icon

`.instui-icon` — Ikonsystemet: `.instui-icon` størrelsesstørrelse plus den delte `-icon-&lt;name&gt;` maler, der maskerer en glyf (i `currentColor`) før ethvert element.

**Kilde:** [icon.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/icon/icon.css)

## Tilgængelighed

Glyfen er dekorativ, så markér den `aria-hidden="true"`; giv den en `role` eller etiket kun når ikonet formidler betydning på egen hånd.

## Brug

```css
@import "@pantoken/components/components.css";
```

## Eksempler

```html
<span class="instui-icon -icon-megaphone" aria-hidden="true"></span>
```

## Modifikatorer

| Modifikator | Beskrivelse |
| --- | --- |
| `.-icon-*` | Angiv glyftoken (`--pantoken-glyph`) og render den via den delte maler (for eksempel `-icon-search`). |

## Pseudo-elementer

| Pseudo-element | Beskrivelse |
| --- | --- |
| `::before` | Selve glyfen: en 1em boks maskeret fra `--pantoken-glyph` og fyldt med `currentColor`. |

## Forbrugte tokens

| Token | Type | Værdi |
| --- | --- | --- |
| `--pantoken-glyph` | `<url>` | `url("data:image/svg+xml` |

