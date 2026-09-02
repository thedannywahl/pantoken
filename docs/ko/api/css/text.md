# CSS: text

`.instui-text` · <span class="instui-pill -color-success pantoken-doc-tag">stable</span> — Body-text typography with size, weight, colour, and style modifiers.

The `-variant-*` presets and the `-color-*`/`-size-*`/`-weight-*` modifiers all compose on the same element; unlike `heading`, it renders no implicit semantic level.

**Source:** [text.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/text/text.css)

## 사용법

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/text.css";
```

## 예제들

```html
<span class="instui-text -size-xs --display-block">x-small text</span>
<span class="instui-text -size-sm --display-block">small text</span>
<span class="instui-text -variant-content-quote --display-block">Quoted text</span>
<span class="instui-text -color-ai-highlight">AI highlight text</span>
```

## 수정자

| 수정자 | 설명 |
| --- | --- |
| `.-color-ai` | <span class="instui-pill -color-danger pantoken-doc-tag">더 이상 사용되지 않음</span> — use `.-color-ai-highlight`. |
| `.-color-ai-highlight` | AI-accent text colour with background highlight. |
| `.-color-brand` | Brand text colour. |
| `.-color-danger` | Danger text colour. |
| `.-color-primary` | Primary text colour. |
| `.-color-primary-inverse` | On-dark (primary inverse) text colour. |
| `.-color-primary-on` | Primary text colour on a coloured background. |
| `.-color-secondary` | Secondary (muted) text colour. |
| `.-color-secondary-inverse` | On-dark (secondary inverse) text colour. |
| `.-color-secondary-on` | Secondary text colour on a coloured background. |
| `.-color-success` | Success text colour. |
| `.-color-warning` | Warning text colour. |
| `.-size-large` | Large. Long-form alias of `-size-lg`. |
| `.-size-lg` | Large. |
| `.-size-sm` | Small. |
| `.-size-small` | Small. Long-form alias of `-size-sm`. |
| `.-size-x-large` | Extra large. Long-form alias of `-size-xl`. |
| `.-size-x-small` | Extra small. Long-form alias of `-size-xs`. |
| `.-size-xl` | Extra large. |
| `.-size-xs` | Extra small. |
| `.-style-italic` | Italic. |
| `.-transform-capitalize` | Capitalise each word. |
| `.-transform-lowercase` | Lowercase the text. |
| `.-transform-uppercase` | Uppercase the text. |
| `.-variant-content` | Content type preset. |
| `.-variant-content-important` | Important-content type preset. |
| `.-variant-content-quote` | Quote-content type preset. |
| `.-variant-content-small` | Small-content type preset. |
| `.-variant-description-page` | Page-description type preset. |
| `.-variant-description-section` | Section-description type preset. |
| `.-variant-legend` | Legend type preset. |
| `.-weight-bold` | Bold weight. |

## 사용된 토큰

| 토큰 | 타입 | 값 |
| --- | --- | --- |
| `--instui-color-institutional-brand-font-color-dark` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-color-institutional-brand-primary` | `<color>` | `light-dark(#1D354F, #EEF4FD)` |
| `--instui-component-text-ai-background-color` | `<color>` | `light-dark(#F3E5F7, #6D3984)` |
| `--instui-component-text-ai-color` | `<color>` | `light-dark(#8A49A7, #F3E5F7)` |
| `--instui-component-text-base-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-component-text-base-on-color` | `<color>` | `#ffffff` |
| `--instui-component-text-content-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-text-content-font-size` | `<length>` | `1rem` |
| `--instui-component-text-content-font-weight` | `<integer>` | `400` |
| `--instui-component-text-content-important-font-size` | `<length>` | `1rem` |
| `--instui-component-text-content-important-font-weight` | `<integer>` | `600` |
| `--instui-component-text-content-important-line-height` | `<percentage>` | `150%` |
| `--instui-component-text-content-line-height` | `<percentage>` | `150%` |
| `--instui-component-text-content-quote-font-size` | `<length>` | `1rem` |
| `--instui-component-text-content-quote-font-style` | — | `italic` |
| `--instui-component-text-content-quote-font-weight` | `<integer>` | `500` |
| `--instui-component-text-content-quote-line-height` | `<percentage>` | `150%` |
| `--instui-component-text-content-small-font-size` | `<length>` | `0.875rem` |
| `--instui-component-text-content-small-font-weight` | `<integer>` | `400` |
| `--instui-component-text-content-small-line-height` | `<percentage>` | `150%` |
| `--instui-component-text-description-page-font-size` | `<length>` | `1.25rem` |
| `--instui-component-text-description-page-font-weight` | `<integer>` | `400` |
| `--instui-component-text-description-page-line-height` | `<percentage>` | `150%` |
| `--instui-component-text-description-section-font-size` | `<length>` | `1rem` |
| `--instui-component-text-description-section-font-weight` | `<integer>` | `400` |
| `--instui-component-text-description-section-line-height` | `<percentage>` | `150%` |
| `--instui-component-text-error-color` | `<color>` | `light-dark(#CF1F24, #FA917F)` |
| `--instui-component-text-font-size-large` | `<length>` | `1.75rem` |
| `--instui-component-text-font-size-medium` | `<length>` | `1rem` |
| `--instui-component-text-font-size-small` | `<length>` | `0.875rem` |
| `--instui-component-text-font-size-x-large` | `<length>` | `2.5rem` |
| `--instui-component-text-font-size-x-small` | `<length>` | `0.75rem` |
| `--instui-component-text-font-weight-bold` | `<integer>` | `600` |
| `--instui-component-text-font-weight-normal` | `<integer>` | `400` |
| `--instui-component-text-inverse-color` | `<color>` | `light-dark(#ffffff, #1C222B)` |
| `--instui-component-text-legend-font-size` | `<length>` | `0.75rem` |
| `--instui-component-text-legend-font-weight` | `<integer>` | `400` |
| `--instui-component-text-legend-line-height` | `<percentage>` | `150%` |
| `--instui-component-text-muted-color` | `<color>` | `light-dark(#576773, #AAB0B5)` |
| `--instui-component-text-muted-on-color` | `<color>` | `#ffffff` |
| `--instui-component-text-primary-color` | `<color>` | `light-dark(#1D354F, #EEF4FD)` |
| `--instui-component-text-success-color` | `<color>` | `light-dark(#037D37, #61C378)` |
| `--instui-component-text-warning-color` | `<color>` | `light-dark(#BB4200, #FF905A)` |

## 관련 항목

- [heading](/ko/api/css/heading.md) — Typography for headings rather than body text.
- [truncate](/ko/api/css/truncate.md) — Clips this text to one line or a set number of lines.

