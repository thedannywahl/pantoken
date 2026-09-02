# CSS: base

`*` — The opt-in global reset: `box-sizing`, the page surface, base text colour and font, `color-scheme`, and link defaults.

**Source:** [base.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/rules/base/base.css)

## Uso

```css
@import "@pantoken/components/base.css";
```

## Ejemplos

```html
<html>
  <body>
    <a href="/">A styled link on the base surface.</a>
  </body>
</html>
```

## Pseudoelementos

| Pseudoelemento | Descripción |
| --- | --- |
| `::after` | Included in the universal `box-sizing: border-box` reset so its generated box sizes predictably. |
| `::before` | Included in the universal `box-sizing: border-box` reset so its generated box sizes predictably. |
| `::selection` | Tints highlighted text with a translucent primary navigation colour. |

## Tokens consumidos

| Token | Tipo | Valor |
| --- | --- | --- |
| `--instui-color-background-page` | `<color>` | `light-dark(#F2F4F5, #10141A)` |
| `--instui-color-text-base` | `<color>` | `light-dark(#273540, #F2F4F5)` |
| `--instui-color-text-interactive-navigation-primary-base` | `<color>` | `light-dark(#2369A4, #7FB4F1)` |
| `--instui-color-text-interactive-navigation-primary-hover` | `<color>` | `light-dark(#1A5281, #ACCDF7)` |
| `--instui-component-text-content-font-size` | `<length>` | `1rem` |
| `--instui-component-text-content-line-height` | `<percentage>` | `150%` |
| `--instui-focus-outline-color` | `auto \| <color>` | — |
| `--instui-focus-outline-color-danger` | `auto \| <color>` | — |
| `--instui-focus-outline-color-inverse` | `auto \| <color>` | — |
| `--instui-focus-outline-color-start` | `auto \| <color>` | — |
| `--instui-focus-outline-color-success` | `auto \| <color>` | — |
| `--instui-focus-outline-inset` | — | — |
| `--instui-focus-outline-offset` | `<length>` | — |
| `--instui-focus-outline-radius` | `<length-percentage [0,∞]>{1,4} [ / <length-percentage [0,∞]>{1,4} ]?` | — |
| `--instui-focus-outline-style` | `auto \| <outline-line-style>` | — |
| `--instui-focus-outline-transition` | — | — |
| `--instui-focus-outline-width` | `<line-width>` | — |
| `--instui-font-family-base` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |

