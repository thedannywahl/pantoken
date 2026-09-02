# CSS: heading

`.instui-heading` — Heading typography from `-level-h1` to `-level-h6`.

The `-variant-*` presets override a `-level-*`'s font-size and font-weight, so combine only one of each family per element.

**Source:** [heading.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/heading/heading.css)

## 접근성

These classes set the visual level only, so render a real `&lt;h1&gt;`–`&lt;h6&gt;` (or use `role="heading"` with `aria-level`) to convey the heading level.

## 사용법

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/heading.css";
```

## 예제들

```html
<div class="instui-heading -level-h1">Heading h1</div>
```

## 수정자

| 수정자 | 설명 |
| --- | --- |
| `.-border-bottom` | Add a bottom rule. |
| `.-border-top` | Add a top rule. |
| `.-color-ai` | AI-accent colour. |
| `.-color-primary` | (default) Primary colour. |
| `.-color-primary-inverse` | On-dark (primary inverse) colour. |
| `.-color-secondary` | Secondary (muted) colour. |
| `.-level-h1` | Render at the h1 type scale. |
| `.-level-h2` | Render at the h2 type scale. |
| `.-level-h3` | Render at the h3 type scale. |
| `.-level-h4` | Render at the h4 type scale. |
| `.-level-h5` | Render at the h5 type scale. |
| `.-level-h6` | Render at the h6 type scale. |
| `.-variant-label` | Label type preset. |
| `.-variant-title-card-mini` | Mini card-title preset. |
| `.-variant-title-card-regular` | Regular card-title preset. |
| `.-variant-title-card-section` | Card section-title preset. |
| `.-variant-title-page` | Page-title preset. |
| `.-variant-title-section` | Section-title preset. |

## 사용된 토큰

| 토큰 | 타입 | 값 |
| --- | --- | --- |
| `--instui-component-heading-ai-text-bottom-gradient-color` | `<color>` | `light-dark(#027887, #3CC0D4)` |
| `--instui-component-heading-ai-text-top-gradient-color` | `<color>` | `light-dark(#944FB3, #CAA1D9)` |
| `--instui-component-heading-base-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-component-heading-border-color` | `<color>` | `light-dark(#8D959F, #6A7883)` |
| `--instui-component-heading-border-padding` | `<length>` | `0.125rem` |
| `--instui-component-heading-border-width` | `<length>` | `0.0625rem` |
| `--instui-component-heading-h1-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Inclusive Sans, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-heading-h1-font-size` | `<length>` | `2.5rem` |
| `--instui-component-heading-h1-font-weight` | `<integer>` | `700` |
| `--instui-component-heading-h2-font-size` | `<length>` | `1.75rem` |
| `--instui-component-heading-h2-font-weight` | `<integer>` | `600` |
| `--instui-component-heading-h3-font-size` | `<length>` | `1.25rem` |
| `--instui-component-heading-h3-font-weight` | `<integer>` | `700` |
| `--instui-component-heading-h4-font-size` | `<length>` | `1rem` |
| `--instui-component-heading-h4-font-weight` | `<integer>` | `700` |
| `--instui-component-heading-h5-font-size` | `<length>` | `0.875rem` |
| `--instui-component-heading-h5-font-weight` | `<integer>` | `600` |
| `--instui-component-heading-h6-font-size` | `<length>` | `0.75rem` |
| `--instui-component-heading-h6-font-weight` | `<integer>` | `600` |
| `--instui-component-heading-inverse-color` | `<color>` | `light-dark(#ffffff, #1C222B)` |
| `--instui-component-heading-label-font-size` | `<length>` | `1rem` |
| `--instui-component-heading-label-font-weight` | `<integer>` | `700` |
| `--instui-component-heading-line-height` | `<percentage>` | `125%` |
| `--instui-component-heading-muted-color` | `<color>` | `light-dark(#576773, #AAB0B5)` |
| `--instui-component-heading-title-card-mini-font-size` | `<length>` | `1rem` |
| `--instui-component-heading-title-card-mini-font-weight` | `<integer>` | `700` |
| `--instui-component-heading-title-card-regular-font-size` | `<length>` | `1.25rem` |
| `--instui-component-heading-title-card-regular-font-weight` | `<integer>` | `700` |
| `--instui-component-heading-title-card-section-font-size` | `<length>` | `1.75rem` |
| `--instui-component-heading-title-card-section-font-weight` | `<integer>` | `700` |
| `--instui-component-heading-title-page-desktop-font-size` | `<length>` | `2.5rem` |
| `--instui-component-heading-title-page-desktop-font-weight` | `<integer>` | `700` |
| `--instui-component-heading-title-section-font-size` | `<length>` | `1.75rem` |
| `--instui-component-heading-title-section-font-weight` | `<integer>` | `700` |

## 관련 항목

- [text](/ko/api/css/text.md) — Body typography for non-heading text.

