# CSS: icon

`.instui-icon` — Ikonsystemet: `.instui-icon` størrelsesstørrelse plus den delte `-icon-&lt;name&gt;` maler, der maskerer en glyf (i `currentColor`) før ethvert element.

**Kilde:** [icon.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/icon/icon.css)

## Accessibility

Glyfen er dekorativ, så markér den `aria-hidden="true"`; giv den en `role` eller etiket kun når ikonet formidler betydning på egen hånd.

## Usage

```css
@import "@pantoken/components/components.css";
```

## Examples

```html
<span class="instui-icon -icon-megaphone" aria-hidden="true"></span>
```

## Modifiers

| Modifier   | Description                                                                                           |
| ---------- | ----------------------------------------------------------------------------------------------------- |
| `.-icon-*` | Angiv glyftoken (`--pantoken-glyph`) og render den via den delte maler (for eksempel `-icon-search`). |

## Pseudo-elements

| Pseudo-element | Description                                                                            |
| -------------- | -------------------------------------------------------------------------------------- |
| `::before`     | Selve glyfen: en 1em boks maskeret fra `--pantoken-glyph` og fyldt med `currentColor`. |

## Tokens consumed

| Token              | Type    | Value |
| ------------------ | ------- | ----- |
| `--pantoken-glyph` | `<url>` | —     |
