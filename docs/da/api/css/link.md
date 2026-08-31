# CSS: link

`.instui-link` — Et stiliseret hyperlink med størrelser, en invers variant til mørke baggrunde og indlejrede eller ustylet former.

Indstiller sit eget responsive `gap` mellem et ikon og dets tekst (`-size-sm`/`-size-lg` skalerer det); sammenkæding af en `-gap-*` spacing utility modifier tilsidesætter denne indbyggede værdi.

**Kilde:** [link.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/link/link.css)

## Accessibility

Markér et deaktiveret link med `aria-disabled="true"`.

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/link.css";
```

## Examples

```html
<a class="instui-link" href="#">A styled link</a>
```

## Modifiers

| Modifier          | Description                                          |
| ----------------- | ---------------------------------------------------- |
| `.-color-inverse` | Til mørke baggrunde.                                 |
| `.-inline`        | Inline link, understreget inden for løbende tekst.   |
| `.-lg`            | Stort inline link (brugt med `-inline`).             |
| `.-size-large`    | Stor. Langt-form alias af `-size-lg`.                |
| `.-size-lg`       | Stor.                                                |
| `.-size-sm`       | Lille.                                               |
| `.-size-small`    | Lille. Langt-form alias af `-size-sm`.               |
| `.-sm`            | Lille inline link (brugt med `-inline`).             |
| `.-unstyled`      | Fjern link-styling: arv farve, ingen understregning. |

## States

| State                    | Description |
| ------------------------ | ----------- |
| `[aria-disabled="true"]` | —           |
| `:state(disabled)`       | —           |

## Tokens consumed

| Token                                                    | Type                                                                                                  | Value                                                                        |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `--instui-component-link-font-family`                    | `[ <font-family-name> \| <generic-font-family> ]#`                                                    | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-link-font-size-lg`                   | `<length>`                                                                                            | `1.75rem`                                                                    |
| `--instui-component-link-font-size-md`                   | `<length>`                                                                                            | `1rem`                                                                       |
| `--instui-component-link-font-size-sm`                   | `<length>`                                                                                            | `0.875rem`                                                                   |
| `--instui-component-link-font-weight`                    | `<integer>`                                                                                           | `500`                                                                        |
| `--instui-component-link-gap-lg`                         | `<length>`                                                                                            | `0.25rem`                                                                    |
| `--instui-component-link-gap-md`                         | `<length>`                                                                                            | `0.25rem`                                                                    |
| `--instui-component-link-gap-sm`                         | `<length>`                                                                                            | `0.125rem`                                                                   |
| `--instui-component-link-inline-link-large-font-size`    | `<length>`                                                                                            | `1.75rem`                                                                    |
| `--instui-component-link-inline-link-large-font-weight`  | `<integer>`                                                                                           | `600`                                                                        |
| `--instui-component-link-inline-link-large-line-height`  | `<length>`                                                                                            | `1.5rem`                                                                     |
| `--instui-component-link-inline-link-medium-font-family` | `[ <font-family-name> \| <generic-font-family> ]#`                                                    | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-link-inline-link-medium-font-size`   | `<length>`                                                                                            | `1rem`                                                                       |
| `--instui-component-link-inline-link-medium-font-weight` | `<integer>`                                                                                           | `600`                                                                        |
| `--instui-component-link-inline-link-medium-line-height` | `<length>`                                                                                            | `1.5rem`                                                                     |
| `--instui-component-link-inline-link-small-font-size`    | `<length>`                                                                                            | `0.875rem`                                                                   |
| `--instui-component-link-inline-link-small-font-weight`  | `<integer>`                                                                                           | `600`                                                                        |
| `--instui-component-link-inline-link-small-line-height`  | `<length>`                                                                                            | `0.875rem`                                                                   |
| `--instui-component-link-line-height-lg`                 | `<length>`                                                                                            | `1.5rem`                                                                     |
| `--instui-component-link-line-height-md`                 | `<length>`                                                                                            | `1rem`                                                                       |
| `--instui-component-link-line-height-sm`                 | `<length>`                                                                                            | `0.875rem`                                                                   |
| `--instui-component-link-on-color-text-color`            | `<color>`                                                                                             | `#ffffff`                                                                    |
| `--instui-component-link-on-color-text-disabled-color`   | `<color>`                                                                                             | `light-dark(#C7CACD, #9EA6AD)`                                               |
| `--instui-component-link-on-color-text-hover-color`      | `<color>`                                                                                             | `light-dark(#DEEBFF, #ffffff)`                                               |
| `--instui-component-link-text-color`                     | `<color>`                                                                                             | `light-dark(#2369A4, #7FB4F1)`                                               |
| `--instui-component-link-text-decoration-outside-text`   | `none \| [ underline \|\| overline \|\| line-through \|\| blink ] \| spelling-error \| grammar-error` | `none`                                                                       |
| `--instui-component-link-text-decoration-within-text`    | `none \| [ underline \|\| overline \|\| line-through \|\| blink ] \| spelling-error \| grammar-error` | `underline`                                                                  |
| `--instui-component-link-text-disabled-color`            | `<color>`                                                                                             | `light-dark(#8D959F, #576773)`                                               |
| `--instui-component-link-text-hover-color`               | `<color>`                                                                                             | `light-dark(#1A5281, #ACCDF7)`                                               |
| `--instui-component-link-unstyled-text-color`            | `<color>`                                                                                             | `light-dark(#273540, #F2F4F5)`                                               |

## Related

- [breadcrumb](/da/api/css/breadcrumb.md) — Et breadcrumb-spor er bygget fra links; også dets small-screen fallback (parrer med `responsive` utility for at skifte Breadcrumb med et Link under ~768px).
