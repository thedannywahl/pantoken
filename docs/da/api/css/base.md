# CSS: base

`*` — Den opt-in globale nulstilling: `box-sizing`, sidefladen, basistekstfarve og skrifttype, `color-scheme`, og linkstandard.

**Kilde:** [base.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/rules/base/base.css)

## Brug

```css
@import "@pantoken/components/base.css";
```

## Eksempler

```html
<html>
  <body>
    <a href="/">A styled link on the base surface.</a>
  </body>
</html>
```

## Pseudo-elementer

| Pseudo-element | Beskrivelse |
| --- | --- |
| `::after` | Inkluderet i den universelle `box-sizing: border-box` nulstilling så dens genererede boksstørrelser er forudsigelige. |
| `::before` | Inkluderet i den universelle `box-sizing: border-box` nulstilling så dens genererede boksstørrelser er forudsigelige. |
| `::selection` | Farver fremhævet tekst med en gennemsigtig primær navigationfarve. |

## Forbrugte tokens

| Token | Type | Værdi |
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

