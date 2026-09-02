# CSS: icon

`.instui-icon` — Պատկերակային համակարգ. `.instui-icon` չափսավորում գումարած կիսված `-icon-&lt;name&gt;` նկարիչ, որը դիմակ է հագցնում գլիֆին (`currentColor`-ում) ցանկացած տարրից առաջ:

**Աղբյուր:** [icon.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/icon/icon.css)

## Մուտքականություն

Գլիֆը դեկորատիվ է, ուստի նշեք այն `aria-hidden="true"`-ի; տվեք այն `role`-ի կամ պիտակ միայն այն դեպքում, երբ պատկերակը ունի իր անկախ իմաստ:

## Օգտագործում

```css
@import "@pantoken/components/components.css";
```

## Օրինակներ

```html
<span class="instui-icon -icon-megaphone" aria-hidden="true"></span>
```

## Մոդիֆիկատորներ

| Մոդիֆիկատոր | Նկարագիր |
| --- | --- |
| `.-icon-*` | Սահմանեք գլիֆի տոկենը (`--pantoken-glyph`) և պատկերեք այն կիսված նկարիչի միջոցով (օրինակ `-icon-search`): |

## Պսևդո-էլեմենտներ

| Պսևդո-էլեմենտ | Նկարագիր |
| --- | --- |
| `::before` | Գլիֆը ինքը՝ 1em տուփ `--pantoken-glyph`-ից դիմակված և `currentColor`-ով լցված: |

## Ցուցիչներ սպառված

| Տոկեն | Տիպ | Արժեք |
| --- | --- | --- |
| `--pantoken-glyph` | `<url>` | `url("data:image/svg+xml` |

