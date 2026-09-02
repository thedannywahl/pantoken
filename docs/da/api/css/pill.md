# CSS: pill

`.instui-pill` — En kompakt statustikabel; tilføj et ledende glyf med den delte `-icon-&lt;name&gt;`-form.

I modsætning til `badge`, som viser et antal, eller `tag`, som kan fjernes, er pillen en statisk statustikabel; dens ledende glyf er en maskeret `::before`, ikke en `&lt;img&gt;`.

**Kilde:** [pill.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/pill/pill.css)

## Brug

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/pill.css";
```

## Eksempler

```html
<div class="instui-pill --display-flex" style="gap: 12px;">
  <span class="instui-pill -color-success -icon-check">Published</span>
  <span class="instui-pill">Draft</span>
  <span class="instui-pill -color-info">In review</span>
  <span class="instui-pill -color-warning">Stale</span>
  <span class="instui-pill -color-danger">Blocked</span>
</div>
```

## Modifikatorer

| Modifikator | Beskrivelse |
| --- | --- |
| `.-color-danger` | Fejlstatus. |
| `.-color-info` | Informationsstatus. |
| `.-color-success` | Positiv status. |
| `.-color-warning` | Advarselsstatus. |
| `.-icon-*` | Et ledende glyf fra ikonsamlingen (f.eks. `-icon-check`), tegnet før etiketten. |
| `.-render-icon-<name>` | <span class="instui-pill -color-danger pantoken-doc-tag">Udløbet</span> — The former `renderIcon` prop; still works as an alias, but use `-icon-<name>` instead. |

## Pseudo-elementer

| Pseudo-element | Beskrivelse |
| --- | --- |
| `::before` | Det ledende ikonglyf, tilpasset størrelse og afstand til pillen. |

## Forbrugte tokens

| Token | Type | Værdi |
| --- | --- | --- |
| `--instui-component-pill-background-color` | `<color>` | `light-dark(#ffffff, #10141A)` |
| `--instui-component-pill-base-border-color` | `<color>` | `light-dark(#8D959F, #6A7883)` |
| `--instui-component-pill-base-text-color` | `<color>` | `light-dark(#273540, #F2F4F5)` |
| `--instui-component-pill-border-radius` | `<length>` | `0.5rem` |
| `--instui-component-pill-border-style` | — | `solid` |
| `--instui-component-pill-border-width` | `<length>` | `0.0625rem` |
| `--instui-component-pill-error-border-color` | `<color>` | `#E62429` |
| `--instui-component-pill-error-text-color` | `<color>` | `light-dark(#CF1F24, #FA917F)` |
| `--instui-component-pill-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-pill-height` | `<length>` | `24px` |
| `--instui-component-pill-info-border-color` | `<color>` | `#2B7ABC` |
| `--instui-component-pill-info-text-color` | `<color>` | `light-dark(#2871AF, #7FB4F1)` |
| `--instui-component-pill-line-height` | `<length>` | `0.875rem` |
| `--instui-component-pill-max-width` | `<length>` | `240px` |
| `--instui-component-pill-padding-horizontal` | `<length>` | `0.5rem` |
| `--instui-component-pill-status-label-font-weight` | `<integer>` | `600` |
| `--instui-component-pill-success-border-color` | `<color>` | `#03893D` |
| `--instui-component-pill-success-text-color` | `<color>` | `light-dark(#037D37, #61C378)` |
| `--instui-component-pill-text-font-size` | `<length>` | `0.875rem` |
| `--instui-component-pill-text-font-weight` | `<integer>` | `600` |
| `--instui-component-pill-warning-border-color` | `<color>` | `#CF4A00` |
| `--instui-component-pill-warning-text-color` | `<color>` | `light-dark(#BB4200, #FF905A)` |
| `--instui-font-size-text-xs` | `<length>` | `0.75rem` |

## Relateret

- [badge](/da/api/css/badge.md) — Et badge er tæller- eller notifikationsmodstykket.
- [tag](/da/api/css/tag.md) — Et tag er det fjernelige, formularorienterede modstykke.

