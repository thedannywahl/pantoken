# CSS: text

`.instui-text` · <span class="instui-pill -color-success pantoken-doc-tag">կայուն</span> — Մարմնի տեքստի տիպոգրաֆիա չափ, քաշ, գույն և ոճի փոփոխիչներով։

`-variant-*` նախադրվածքները և `-color-*`/`-size-*`/`-weight-*` փոփոխիչները բոլորը կազմել են նույն տարրի վրա; ի տարբերություն `heading`-ի, այն չի ներկայացնում ներածական իմաստային մակարդակ։

**Աղբյուր.** [text.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/text/text.css)

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/text.css";
```

## Examples

```html
<span class="instui-text -size-xs --display-block">x-small text</span>
<span class="instui-text -size-sm --display-block">small text</span>
<span class="instui-text -variant-content-quote --display-block">Quoted text</span>
<span class="instui-text -color-ai-highlight">AI highlight text</span>
```

## Modifiers

| Modifier                        | Description                                                                                              |
| ------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `.-color-ai`                    | <span class="instui-pill -color-danger pantoken-doc-tag">Deprecated</span> — use `.-color-ai-highlight`. |
| `.-color-ai-highlight`          | ԱԻ-շեղակ տեքստի գույն ֆոնային ընդգծմամբ։                                                                 |
| `.-color-brand`                 | Բրենդի տեքստի գույն։                                                                                     |
| `.-color-danger`                | Վտանգի տեքստի գույն։                                                                                     |
| `.-color-primary`               | Առաջնային տեքստի գույն։                                                                                  |
| `.-color-primary-inverse`       | Մութ-վրա (առաջնային հակադարձ) տեքստի գույն։                                                              |
| `.-color-primary-on`            | Առաջնային տեքստի գույն գծազգեստ ֆոնի վրա։                                                                |
| `.-color-secondary`             | Երկրորդային (խաղբ) տեքստի գույն։                                                                         |
| `.-color-secondary-inverse`     | Մութ-վրա (երկրորդային հակադարձ) տեքստի գույն։                                                            |
| `.-color-secondary-on`          | Երկրորդային տեքստի գույն գծազգեստ ֆոնի վրա։                                                              |
| `.-color-success`               | Հաջողության տեքստի գույն։                                                                                |
| `.-color-warning`               | Զգուշացման տեքստի գույն։                                                                                 |
| `.-size-large`                  | Մեծ. Երկար-ձեւ այլանունը `-size-lg`:                                                                     |
| `.-size-lg`                     | Մեծ:                                                                                                     |
| `.-size-sm`                     | Փոքր:                                                                                                    |
| `.-size-small`                  | Փոքր. Երկար-ձեւ այլանունը `-size-sm`:                                                                    |
| `.-size-x-large`                | Չափազանց մեծ. Երկար-ձեւ այլանունը `-size-xl`:                                                            |
| `.-size-x-small`                | Չափազանց փոքր. Երկար-ձեւ այլանունը `-size-xs`:                                                           |
| `.-size-xl`                     | Չափազանց մեծ:                                                                                            |
| `.-size-xs`                     | Չափազանց փոքր:                                                                                           |
| `.-style-italic`                | Շեղական։                                                                                                 |
| `.-transform-capitalize`        | Մեծատառ յուրաքանչյուր բառ։                                                                               |
| `.-transform-lowercase`         | Փոքրատառ տեքստ։                                                                                          |
| `.-transform-uppercase`         | Մեծատառ տեքստ։                                                                                           |
| `.-variant-content`             | Բովանդակության տեսակի նախադրվածք։                                                                        |
| `.-variant-content-important`   | Կարևոր բովանդակության տեսակի նախադրվածք։                                                                 |
| `.-variant-content-quote`       | Մեջբերման բովանդակության տեսակի նախադրվածք։                                                              |
| `.-variant-content-small`       | Փոքր բովանդակության տեսակի նախադրվածք։                                                                   |
| `.-variant-description-page`    | Էջի նկարագրության տեսակի նախադրվածք։                                                                     |
| `.-variant-description-section` | Բաժնի նկարագրության տեսակի նախադրվածք։                                                                   |
| `.-variant-legend`              | Լեգենդ տեսակի նախադրվածք։                                                                                |
| `.-weight-bold`                 | Համարձակ քաշ։                                                                                            |

## Tokens consumed

| Token                                                     | Type                                               | Value                                                                        |
| --------------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------- |
| `--instui-color-institutional-brand-font-color-dark`      | `<color>`                                          | `light-dark(#273540, #ffffff)`                                               |
| `--instui-color-institutional-brand-primary`              | `<color>`                                          | `light-dark(#1D354F, #EEF4FD)`                                               |
| `--instui-component-text-ai-background-color`             | `<color>`                                          | `light-dark(#F3E5F7, #6D3984)`                                               |
| `--instui-component-text-ai-color`                        | `<color>`                                          | `light-dark(#8A49A7, #F3E5F7)`                                               |
| `--instui-component-text-base-color`                      | `<color>`                                          | `light-dark(#273540, #ffffff)`                                               |
| `--instui-component-text-base-on-color`                   | `<color>`                                          | `#ffffff`                                                                    |
| `--instui-component-text-content-font-family`             | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-text-content-font-size`               | `<length>`                                         | `1rem`                                                                       |
| `--instui-component-text-content-font-weight`             | `<integer>`                                        | `400`                                                                        |
| `--instui-component-text-content-important-font-size`     | `<length>`                                         | `1rem`                                                                       |
| `--instui-component-text-content-important-font-weight`   | `<integer>`                                        | `600`                                                                        |
| `--instui-component-text-content-important-line-height`   | `<percentage>`                                     | `150%`                                                                       |
| `--instui-component-text-content-line-height`             | `<percentage>`                                     | `150%`                                                                       |
| `--instui-component-text-content-quote-font-size`         | `<length>`                                         | `1rem`                                                                       |
| `--instui-component-text-content-quote-font-style`        | —                                                  | `italic`                                                                     |
| `--instui-component-text-content-quote-font-weight`       | `<integer>`                                        | `500`                                                                        |
| `--instui-component-text-content-quote-line-height`       | `<percentage>`                                     | `150%`                                                                       |
| `--instui-component-text-content-small-font-size`         | `<length>`                                         | `0.875rem`                                                                   |
| `--instui-component-text-content-small-font-weight`       | `<integer>`                                        | `400`                                                                        |
| `--instui-component-text-content-small-line-height`       | `<percentage>`                                     | `150%`                                                                       |
| `--instui-component-text-description-page-font-size`      | `<length>`                                         | `1.25rem`                                                                    |
| `--instui-component-text-description-page-font-weight`    | `<integer>`                                        | `400`                                                                        |
| `--instui-component-text-description-page-line-height`    | `<percentage>`                                     | `150%`                                                                       |
| `--instui-component-text-description-section-font-size`   | `<length>`                                         | `1rem`                                                                       |
| `--instui-component-text-description-section-font-weight` | `<integer>`                                        | `400`                                                                        |
| `--instui-component-text-description-section-line-height` | `<percentage>`                                     | `150%`                                                                       |
| `--instui-component-text-error-color`                     | `<color>`                                          | `light-dark(#CF1F24, #FA917F)`                                               |
| `--instui-component-text-font-size-large`                 | `<length>`                                         | `1.75rem`                                                                    |
| `--instui-component-text-font-size-medium`                | `<length>`                                         | `1rem`                                                                       |
| `--instui-component-text-font-size-small`                 | `<length>`                                         | `0.875rem`                                                                   |
| `--instui-component-text-font-size-x-large`               | `<length>`                                         | `2.5rem`                                                                     |
| `--instui-component-text-font-size-x-small`               | `<length>`                                         | `0.75rem`                                                                    |
| `--instui-component-text-font-weight-bold`                | `<integer>`                                        | `600`                                                                        |
| `--instui-component-text-font-weight-normal`              | `<integer>`                                        | `400`                                                                        |
| `--instui-component-text-inverse-color`                   | `<color>`                                          | `light-dark(#ffffff, #1C222B)`                                               |
| `--instui-component-text-legend-font-size`                | `<length>`                                         | `0.75rem`                                                                    |
| `--instui-component-text-legend-font-weight`              | `<integer>`                                        | `400`                                                                        |
| `--instui-component-text-legend-line-height`              | `<percentage>`                                     | `150%`                                                                       |
| `--instui-component-text-muted-color`                     | `<color>`                                          | `light-dark(#576773, #AAB0B5)`                                               |
| `--instui-component-text-muted-on-color`                  | `<color>`                                          | `#ffffff`                                                                    |
| `--instui-component-text-primary-color`                   | `<color>`                                          | `light-dark(#1D354F, #EEF4FD)`                                               |
| `--instui-component-text-success-color`                   | `<color>`                                          | `light-dark(#037D37, #61C378)`                                               |
| `--instui-component-text-warning-color`                   | `<color>`                                          | `light-dark(#BB4200, #FF905A)`                                               |

## Related

- [heading](/hy/api/css/heading.md) — Հերթական տեքստի համար տիպոգրաֆիա, այլ ոչ թե մարմնի տեքստ։
- [truncate](/hy/api/css/truncate.md) — Կտրում է այս տեքստը մեկ տողի կամ տողերի կանխորոշված թվի վրա։
