# CSS: button

`.instui-button` — An accessible action control, styled from the token palette; primary by default.

The AI variants layer two gradients — a padding-box fill and a border-box stroke — for their frame, and `-color-ai-secondary` can't paint gradient text and a fill at once, so its centre stays transparent at rest and fills on hover or active. Ghost hover and active derive a low-opacity, slightly-darkened brand wash rather than using the raw hover-background tokens, which would print same-colour-on-same-colour text. Also sets its own icon/label `gap` and horizontal `padding`; chaining a `-gap-*`/`-p-*`/`-padding-*` spacing utility modifier overrides those built-in values.

**Source:** [button.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/button/button.css)

## 접근성

Drive the `-toggle` variant's pressed state with `aria-pressed`, and mark a disabled button with `aria-disabled` (or the native `disabled`).

## 사용법

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/button.css";
```

## 데모

```demo
self:button
```

## 예제들

```html
<button class="instui-button">Primary</button>
<button class="instui-button -color-secondary">Secondary</button>
```

## 수정자

| 수정자 | 설명 |
| --- | --- |
| `.-color-ai` | An AI action. |
| `.-color-ai-secondary` | A lower-emphasis AI action. |
| `.-color-danger` | A destructive action. |
| `.-color-primary` | (default) the primary action. |
| `.-color-primary-inverse` | <span class="instui-pill -color-danger pantoken-doc-tag">더 이상 사용되지 않음</span> — use `.-on-color`. |
| `.-color-secondary` | A lower-emphasis secondary action. |
| `.-color-success` | A positive/confirming action. |
| `.-color-tertiary` | A text-style action (no fill or border until hover). |
| `.-condensed` | Tighter padding for dense toolbars. |
| `.-display-block` | Full-width block button. |
| `.-ghost` | Outline (ghost) style: a border in the colour's ghost tokens, no fill. |
| `.-icon-*` | Render a glyph from the icon set before the label (e.g. `-icon-arrow-right`), painted in the button's text colour; pair with `-shape-square`/`-shape-circle` for an icon-only button. |
| `.-on-color` | For a button placed on a coloured (non-neutral) surface. Composed with `-color-primary` (default) fills white with dark text; composed with `-color-secondary` stays transparent with a white border and text. |
| `.-shape-circle` | A round icon button. |
| `.-shape-square` | A square icon button. |
| `.-size-large` | Large. Long-form alias of `-size-lg`. |
| `.-size-lg` | Large. |
| `.-size-md` | (default) medium size. |
| `.-size-medium` | (default) medium size. Long-form alias of `-size-md`. |
| `.-size-sm` | Small. |
| `.-size-small` | Small. Long-form alias of `-size-sm`. |
| `.-toggle` | A pressed-state toggle button (drive with aria-pressed). |
| `.-without-background` | Drop the fill (ghost). |
| `.-without-border` | Remove the border. |

## 의사 요소

| 의사 요소 | 설명 |
| --- | --- |
| `::after` | The AI-secondary gradient border ring, masked to just the button's frame. |
| `::before` | The AI glyph, added automatically to AI buttons and masked in the variant's own colour. |

## 상태

| 상태 | 설명 |
| --- | --- |
| `[aria-disabled="true"]` | — |
| `[aria-pressed="true"]` | — |
| `:disabled` | — |
| `:state(pressed)` | — |

## 사용된 토큰

| 토큰 | 타입 | 값 |
| --- | --- | --- |
| `--instui-border-width-md` | `<length>` | `0.125rem` |
| `--instui-border-width-sm` | `<length>` | `0.0625rem` |
| `--instui-color-background-interactive-action-ai-bottom-gradient-active` | `<color>` | `#01626E` |
| `--instui-color-background-interactive-action-ai-bottom-gradient-base` | `<color>` | `#027887` |
| `--instui-color-background-interactive-action-ai-bottom-gradient-hover` | `<color>` | `#00828E` |
| `--instui-color-background-interactive-action-ai-secondary-active-bottom-gradient` | `<color>` | `light-dark(#CFF0F6, #00424A)` |
| `--instui-color-background-interactive-action-ai-secondary-active-top-gradient` | `<color>` | `light-dark(#F3E5F7, #522965)` |
| `--instui-color-background-interactive-action-ai-secondary-hover-bottom-gradient` | `<color>` | `light-dark(#CFF0F6, #00424A)` |
| `--instui-color-background-interactive-action-ai-secondary-hover-top-gradient` | `<color>` | `light-dark(#F3E5F7, #522965)` |
| `--instui-color-background-interactive-action-ai-top-gradient-active` | `<color>` | `#793F93` |
| `--instui-color-background-interactive-action-ai-top-gradient-base` | `<color>` | `#944FB3` |
| `--instui-color-background-interactive-action-ai-top-gradient-hover` | `<color>` | `#9E58BD` |
| `--instui-color-background-interactive-action-destructive-active` | `<color>` | `#AE161B` |
| `--instui-color-background-interactive-action-destructive-base` | `<color>` | `#CF1F24` |
| `--instui-color-background-interactive-action-destructive-hover` | `<color>` | `#E62429` |
| `--instui-color-background-interactive-action-primary-active` | `<color>` | `light-dark(#061C30, #D5E2F6)` |
| `--instui-color-background-interactive-action-primary-base` | `<color>` | `light-dark(#1D354F, #EEF4FD)` |
| `--instui-color-background-interactive-action-primary-disabled` | `<color>` | `light-dark(#DFE1E3, #334450)` |
| `--instui-color-background-interactive-action-primary-hover` | `<color>` | `light-dark(#234465, #ffffff)` |
| `--instui-color-background-interactive-action-primary-on-color-active` | `<color>` | `#B6CCEA` |
| `--instui-color-background-interactive-action-primary-on-color-base` | `<color>` | `#ffffff` |
| `--instui-color-background-interactive-action-primary-on-color-disabled` | `<color>` | `#8D959F` |
| `--instui-color-background-interactive-action-primary-on-color-hover` | `<color>` | `#D5E2F6` |
| `--instui-color-background-interactive-action-secondary-active` | `<color>` | `light-dark(#44709F, #2E5177)` |
| `--instui-color-background-interactive-action-secondary-base` | `<color>` | `light-dark(#44709F, #345B84)` |
| `--instui-color-background-interactive-action-secondary-hover` | `<color>` | `light-dark(#44709F, #3E6895)` |
| `--instui-color-background-interactive-action-success-base` | `<color>` | `#037D37` |
| `--instui-color-background-interactive-action-success-hover` | `<color>` | `#03893D` |
| `--instui-color-background-interactive-action-tertiary-active` | `<color>` | `light-dark(#E2EAF7, #234465)` |
| `--instui-color-background-interactive-action-tertiary-hover` | `<color>` | `light-dark(#EEF4FD, #2E5177)` |
| `--instui-color-background-muted` | `<color>` | `light-dark(#F2F4F5, #273540)` |
| `--instui-color-stroke-interactive-action-ai-bottom-gradient-active` | `<color>` | `light-dark(#01626E, #02717E)` |
| `--instui-color-stroke-interactive-action-ai-bottom-gradient-base` | `<color>` | `#027887` |
| `--instui-color-stroke-interactive-action-ai-bottom-gradient-hover` | `<color>` | `#00828E` |
| `--instui-color-stroke-interactive-action-ai-top-gradient-active` | `<color>` | `light-dark(#793F93, #8A49A7)` |
| `--instui-color-stroke-interactive-action-ai-top-gradient-base` | `<color>` | `#944FB3` |
| `--instui-color-stroke-interactive-action-ai-top-gradient-hover` | `<color>` | `#9E58BD` |
| `--instui-color-stroke-interactive-action-primary-active` | `<color>` | `light-dark(#061C30, #D5E2F6)` |
| `--instui-color-stroke-interactive-action-primary-base` | `<color>` | `light-dark(#1D354F, #EEF4FD)` |
| `--instui-color-stroke-interactive-action-primary-hover` | `<color>` | `light-dark(#234465, #ffffff)` |
| `--instui-color-stroke-interactive-action-primary-on-color-active` | `<color>` | `#B6CCEA` |
| `--instui-color-stroke-interactive-action-primary-on-color-base` | `<color>` | `#ffffff` |
| `--instui-color-stroke-interactive-action-primary-on-color-disabled` | `<color>` | `#8D959F` |
| `--instui-color-stroke-interactive-action-primary-on-color-hover` | `<color>` | `#D5E2F6` |
| `--instui-color-stroke-interactive-action-secondary-active` | `<color>` | `light-dark(#44709F, #2E5177)` |
| `--instui-color-stroke-interactive-action-secondary-base` | `<color>` | `light-dark(#44709F, #345B84)` |
| `--instui-color-stroke-interactive-action-secondary-hover` | `<color>` | `light-dark(#44709F, #3E6895)` |
| `--instui-color-stroke-interactive-action-secondary-on-color-active` | `<color>` | `#B6CCEA` |
| `--instui-color-stroke-interactive-action-secondary-on-color-base` | `<color>` | `#ffffff` |
| `--instui-color-stroke-interactive-action-secondary-on-color-disabled` | `<color>` | `#8D959F` |
| `--instui-color-stroke-interactive-action-secondary-on-color-hover` | `<color>` | `#D5E2F6` |
| `--instui-color-stroke-interactive-action-tertiary-base` | `<color>` | `light-dark(#86A8D5, #7097C7)` |
| `--instui-color-text-interactive-action-ai-active` | `<color>` | `#ffffff` |
| `--instui-color-text-interactive-action-ai-base` | `<color>` | `#ffffff` |
| `--instui-color-text-interactive-action-ai-hover` | `<color>` | `#ffffff` |
| `--instui-color-text-interactive-action-ai-secondary-bottom-gradient-base` | `<color>` | `light-dark(#027887, #3CC0D4)` |
| `--instui-color-text-interactive-action-ai-secondary-top-gradient-base` | `<color>` | `light-dark(#944FB3, #CAA1D9)` |
| `--instui-color-text-interactive-action-primary-base` | `<color>` | `light-dark(#ffffff, #1D354F)` |
| `--instui-color-text-interactive-action-primary-disabled` | `<color>` | `light-dark(#9EA6AD, #6A7883)` |
| `--instui-color-text-interactive-action-primary-on-color-active` | `<color>` | `#213D5B` |
| `--instui-color-text-interactive-action-primary-on-color-base` | `<color>` | `#213D5B` |
| `--instui-color-text-interactive-action-primary-on-color-disabled` | `<color>` | `#4A5B68` |
| `--instui-color-text-interactive-action-primary-on-color-hover` | `<color>` | `#213D5B` |
| `--instui-color-text-interactive-action-secondary-base` | `<color>` | `light-dark(#1D354F, #ffffff)` |
| `--instui-color-text-interactive-action-secondary-on-color-active` | `<color>` | `#ffffff` |
| `--instui-color-text-interactive-action-secondary-on-color-base` | `<color>` | `#ffffff` |
| `--instui-color-text-interactive-action-secondary-on-color-disabled` | `<color>` | `#9EA6AD` |
| `--instui-color-text-interactive-action-secondary-on-color-hover` | `<color>` | `#ffffff` |
| `--instui-color-text-interactive-action-status-base` | `<color>` | `#ffffff` |
| `--instui-color-text-interactive-action-tertiary-base` | `<color>` | `light-dark(#1D354F, #EEF4FD)` |
| `--instui-component-base-button-border-radius` | `<length>` | `0.75rem` |
| `--instui-component-base-button-large-font-size` | `<length>` | `1.125rem` |
| `--instui-component-base-button-large-height` | `<length>` | `3rem` |
| `--instui-component-base-button-large-padding-horizontal` | `<length>` | `1.25rem` |
| `--instui-component-base-button-medium-font-size` | `<length>` | `1rem` |
| `--instui-component-base-button-medium-height` | `<length>` | `2.5rem` |
| `--instui-component-base-button-medium-padding-horizontal` | `<length>` | `1rem` |
| `--instui-component-base-button-primary-ghost-background` | `<color>` | `transparent` |
| `--instui-component-base-button-primary-ghost-border-color` | `<color>` | `light-dark(#1D354F, #EEF4FD)` |
| `--instui-component-base-button-primary-ghost-color` | `<color>` | `light-dark(#1D354F, #EEF4FD)` |
| `--instui-component-base-button-primary-inverse-active-background` | `<color>` | `#B6CCEA` |
| `--instui-component-base-button-primary-inverse-background` | `<color>` | `#ffffff` |
| `--instui-component-base-button-primary-inverse-border-color` | `<color>` | `#ffffff` |
| `--instui-component-base-button-primary-inverse-color` | `<color>` | `#213D5B` |
| `--instui-component-base-button-primary-inverse-hover-background` | `<color>` | `#D5E2F6` |
| `--instui-component-base-button-primary-on-color-active-border-color` | `<color>` | `#B6CCEA` |
| `--instui-component-base-button-primary-on-color-hover-border-color` | `<color>` | `#D5E2F6` |
| `--instui-component-base-button-secondary-ghost-background` | `<color>` | `transparent` |
| `--instui-component-base-button-secondary-ghost-border-color` | `<color>` | `light-dark(#1D354F, #ffffff)` |
| `--instui-component-base-button-secondary-ghost-color` | `<color>` | `light-dark(#1D354F, #ffffff)` |
| `--instui-component-base-button-small-font-size` | `<length>` | `0.875rem` |
| `--instui-component-base-button-small-height` | `<length>` | `2rem` |
| `--instui-component-base-button-small-padding-horizontal` | `<length>` | `0.75rem` |
| `--instui-font-family-base` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-font-weight-interactive` | `<integer>` | `500` |
| `--instui-line-height-standalone-text-base` | `<length>` | `1rem` |
| `--instui-spacing-space-xs` | `<length>` | `0.25rem` |

## 관련 항목

- [close-button](/ko/api/css/close-button.md) — The icon-only dismiss button.

