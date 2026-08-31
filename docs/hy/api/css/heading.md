# CSS: heading

`.instui-heading` — Վերնագրի տիպոգրաֆիա `-level-h1`-ից մինչև `-level-h6`:

The `-variant-*` նախորոշումներն վերազեր են անում `-level-*`-ի ֆոնտի չափը և ֆոնտի քաշը, ուստի յուրաքանչյուր տարրում միավորեք միայն մեկ ընտանիքից:

**Աղբյուր:** [heading.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/heading/heading.css)

## Accessibility

Այս դասերը սահմանում են միայն տեսային մակարդակը, ուստի պատկերեք իրական `&lt;h1&gt;`–`&lt;h6&gt;` (կամ օգտագործեք `role="heading"`-ը `aria-level`-ի հետ) վերնագրի մակարդակը հաղորդելու համար:

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/heading.css";
```

## Examples

```html
<div class="instui-heading -level-h1">Heading h1</div>
```

## Modifiers

| Modifier                       | Description                              |
| ------------------------------ | ---------------------------------------- |
| `.-border-bottom`              | Ավելացրեք ներքևի գիծ:                    |
| `.-border-top`                 | Ավելացրեք վերևի գիծ:                     |
| `.-color-ai`                   | ԱԻ-շեշտ գույն:                           |
| `.-color-primary`              | (հիմնական) Առաջային գույն:               |
| `.-color-primary-inverse`      | Մութ ֆոնի վրա (առաջային հակադարձ) գույն: |
| `.-color-secondary`            | Երկրորդական (հանդարտեցված) գույն:        |
| `.-level-h1`                   | Պատկերեք h1 տիպի մասշտաբով:              |
| `.-level-h2`                   | Պատկերեք h2 տիպի մասշտաբով:              |
| `.-level-h3`                   | Պատկերեք h3 տիպի մասշտաբով:              |
| `.-level-h4`                   | Պատկերեք h4 տիպի մասշտաբով:              |
| `.-level-h5`                   | Պատկերեք h5 տիպի մասշտաբով:              |
| `.-level-h6`                   | Պատկերեք h6 տիպի մասշտաբով:              |
| `.-variant-label`              | Պիտակի տիպի նախորոշում:                  |
| `.-variant-title-card-mini`    | Մինի քարտի-վերնագիր նախորոշում:          |
| `.-variant-title-card-regular` | Սովորական քարտի-վերնագիր նախորոշում:     |
| `.-variant-title-card-section` | Քարտի բաժինի-վերնագիր նախորոշում:        |
| `.-variant-title-page`         | Էջի-վերնագիր նախորոշում:                 |
| `.-variant-title-section`      | Բաժինի-վերնագիր նախորոշում:              |

## Tokens consumed

| Token                                                       | Type                                               | Value                                                            |
| ----------------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------- |
| `--instui-component-heading-ai-text-bottom-gradient-color`  | `<color>`                                          | `light-dark(#027887, #3CC0D4)`                                   |
| `--instui-component-heading-ai-text-top-gradient-color`     | `<color>`                                          | `light-dark(#944FB3, #CAA1D9)`                                   |
| `--instui-component-heading-base-color`                     | `<color>`                                          | `light-dark(#273540, #ffffff)`                                   |
| `--instui-component-heading-border-color`                   | `<color>`                                          | `light-dark(#8D959F, #6A7883)`                                   |
| `--instui-component-heading-border-padding`                 | `<length>`                                         | `0.125rem`                                                       |
| `--instui-component-heading-border-width`                   | `<length>`                                         | `0.0625rem`                                                      |
| `--instui-component-heading-h1-font-family`                 | `[ <font-family-name> \| <generic-font-family> ]#` | `Inclusive Sans, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-heading-h1-font-size`                   | `<length>`                                         | `2.5rem`                                                         |
| `--instui-component-heading-h1-font-weight`                 | `<integer>`                                        | `700`                                                            |
| `--instui-component-heading-h2-font-size`                   | `<length>`                                         | `1.75rem`                                                        |
| `--instui-component-heading-h2-font-weight`                 | `<integer>`                                        | `600`                                                            |
| `--instui-component-heading-h3-font-size`                   | `<length>`                                         | `1.25rem`                                                        |
| `--instui-component-heading-h3-font-weight`                 | `<integer>`                                        | `700`                                                            |
| `--instui-component-heading-h4-font-size`                   | `<length>`                                         | `1rem`                                                           |
| `--instui-component-heading-h4-font-weight`                 | `<integer>`                                        | `700`                                                            |
| `--instui-component-heading-h5-font-size`                   | `<length>`                                         | `0.875rem`                                                       |
| `--instui-component-heading-h5-font-weight`                 | `<integer>`                                        | `600`                                                            |
| `--instui-component-heading-h6-font-size`                   | `<length>`                                         | `0.75rem`                                                        |
| `--instui-component-heading-h6-font-weight`                 | `<integer>`                                        | `600`                                                            |
| `--instui-component-heading-inverse-color`                  | `<color>`                                          | `light-dark(#ffffff, #1C222B)`                                   |
| `--instui-component-heading-label-font-size`                | `<length>`                                         | `1rem`                                                           |
| `--instui-component-heading-label-font-weight`              | `<integer>`                                        | `700`                                                            |
| `--instui-component-heading-line-height`                    | `<percentage>`                                     | `125%`                                                           |
| `--instui-component-heading-muted-color`                    | `<color>`                                          | `light-dark(#576773, #AAB0B5)`                                   |
| `--instui-component-heading-title-card-mini-font-size`      | `<length>`                                         | `1rem`                                                           |
| `--instui-component-heading-title-card-mini-font-weight`    | `<integer>`                                        | `700`                                                            |
| `--instui-component-heading-title-card-regular-font-size`   | `<length>`                                         | `1.25rem`                                                        |
| `--instui-component-heading-title-card-regular-font-weight` | `<integer>`                                        | `700`                                                            |
| `--instui-component-heading-title-card-section-font-size`   | `<length>`                                         | `1.75rem`                                                        |
| `--instui-component-heading-title-card-section-font-weight` | `<integer>`                                        | `700`                                                            |
| `--instui-component-heading-title-page-desktop-font-size`   | `<length>`                                         | `2.5rem`                                                         |
| `--instui-component-heading-title-page-desktop-font-weight` | `<integer>`                                        | `700`                                                            |
| `--instui-component-heading-title-section-font-size`        | `<length>`                                         | `1.75rem`                                                        |
| `--instui-component-heading-title-section-font-weight`      | `<integer>`                                        | `700`                                                            |

## Related

- [text](/hy/api/css/text.md) — Մարմնի տիպոգրաֆիա ոչ վերնագիր տեքստի համար:
