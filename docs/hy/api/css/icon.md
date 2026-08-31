# CSS: icon

`.instui-icon` — Պատկերակային համակարգ. `.instui-icon` չափսավորում գումարած կիսված `-icon-&lt;name&gt;` նկարիչ, որը դիմակ է հագցնում գլիֆին (`currentColor`-ում) ցանկացած տարրից առաջ:

**Աղբյուր:** [icon.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/icon/icon.css)

## Accessibility

Գլիֆը դեկորատիվ է, ուստի նշեք այն `aria-hidden="true"`-ի; տվեք այն `role`-ի կամ պիտակ միայն այն դեպքում, երբ պատկերակը ունի իր անկախ իմաստ:

## Usage

```css
@import "@pantoken/components/components.css";
```

## Examples

```html
<span class="instui-icon -icon-megaphone" aria-hidden="true"></span>
```

## Modifiers

| Modifier   | Description                                                                                               |
| ---------- | --------------------------------------------------------------------------------------------------------- |
| `.-icon-*` | Սահմանեք գլիֆի տոկենը (`--pantoken-glyph`) և պատկերեք այն կիսված նկարիչի միջոցով (օրինակ `-icon-search`): |

## Pseudo-elements

| Pseudo-element | Description                                                                    |
| -------------- | ------------------------------------------------------------------------------ |
| `::before`     | Գլիֆը ինքը՝ 1em տուփ `--pantoken-glyph`-ից դիմակված և `currentColor`-ով լցված: |

## Tokens consumed

| Token              | Type    | Value |
| ------------------ | ------- | ----- |
| `--pantoken-glyph` | `<url>` | —     |
