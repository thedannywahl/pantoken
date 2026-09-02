# CSS: color

`.--text-danger` — Semantic colour utilities: `.--bg-&lt;name&gt;`, `.--text-&lt;name&gt;` (aliased as `.--color-&lt;name&gt;`), and `.--border-&lt;name&gt;` for the curated semantic palette. Every one of these also has a component-attached alias modifier (for example `-bg-danger` on any `.instui-&lt;component&gt;`).

**Source:** [generate.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/scripts/generate.ts)

## Использование

```css
@import "@pantoken/components/utilities.css";
```

## Примеры

```html
<p class="--text-danger">Something went wrong.</p>
```

## Модификаторы

| Модификатор | Описание |
| --- | --- |
| `.--text-danger` | Applies the semantic danger text colour. |
| `.--bg-*` | Background colour utilities for semantic and component-aligned names. |
| `.--border-*` | Border colour utilities for semantic and component-aligned names. |
| `.--color-*` | Alias of `--text-*` for text colour utilities. |
| `.--text-*` | Text colour utilities for semantic and component-aligned names. |

## Использованные токены

| Токен | Тип | Значение |
| --- | --- | --- |
| `--instui-border-radius-container-lg` | `<length>` | `1.5rem` |
| `--instui-border-radius-container-md` | `<length>` | `1rem` |
| `--instui-border-radius-container-sm` | `<length>` | `0.5rem` |
| `--instui-border-radius-container-xl` | `<length>` | `2rem` |
| `--instui-border-radius-full` | `<length>` | `999rem` |
| `--instui-border-radius-interactive-base` | `<length>` | `0.75rem` |
| `--instui-border-radius-lg` | `<length>` | `0.75rem` |
| `--instui-border-radius-md` | `<length>` | `0.5rem` |
| `--instui-border-radius-sm` | `<length>` | `0.25rem` |
| `--instui-border-radius-xl` | `<length>` | `1rem` |
| `--instui-border-radius-xs` | `<length>` | `0.125rem` |
| `--instui-border-radius-xxl` | `<length>` | `1.5rem` |
| `--instui-border-width-interactive-base` | `<length>` | `0.0625rem` |
| `--instui-border-width-interactive-focus` | `<length>` | `0.125rem` |
| `--instui-border-width-lg` | `<length>` | `0.25rem` |
| `--instui-border-width-md` | `<length>` | `0.125rem` |
| `--instui-border-width-sm` | `<length>` | `0.0625rem` |
| `--instui-color-background-accent-ash` | `<color>` | `light-dark(#273540, #1C222B)` |
| `--instui-color-background-accent-aurora` | `<color>` | `#048660` |
| `--instui-color-background-accent-blue` | `<color>` | `#2B7ABC` |
| `--instui-color-background-accent-green` | `<color>` | `#03893D` |
| `--instui-color-background-accent-grey` | `<color>` | `light-dark(#4A5B68, #576773)` |
| `--instui-color-background-accent-honey` | `<color>` | `#996E00` |
| `--instui-color-background-accent-orange` | `<color>` | `#CF4A00` |
| `--instui-color-background-accent-plum` | `<color>` | `#C54396` |
| `--instui-color-background-accent-red` | `<color>` | `#E62429` |
| `--instui-color-background-accent-sea` | `<color>` | `#00828E` |
| `--instui-color-background-accent-sky` | `<color>` | `#197EAB` |
| `--instui-color-background-accent-stone` | `<color>` | `#767676` |
| `--instui-color-background-accent-violet` | `<color>` | `#9E58BD` |
| `--instui-color-background-base` | `<color>` | `light-dark(#ffffff, #10141A)` |
| `--instui-color-background-brand` | `<color>` | `light-dark(#1D354F, #EEF4FD)` |
| `--instui-color-background-container` | `<color>` | `light-dark(#ffffff, #1C222B)` |
| `--instui-color-background-dark` | `<color>` | `light-dark(#273540, #1C222B)` |
| `--instui-color-background-error` | `<color>` | `#E62429` |
| `--instui-color-background-info` | `<color>` | `#2B7ABC` |
| `--instui-color-background-inverse` | `<color>` | `light-dark(#334450, #F2F4F5)` |
| `--instui-color-background-muted` | `<color>` | `light-dark(#F2F4F5, #273540)` |
| `--instui-color-background-on-color` | `<color>` | `#ffffff` |
| `--instui-color-background-page` | `<color>` | `light-dark(#F2F4F5, #10141A)` |
| `--instui-color-background-success` | `<color>` | `#03893D` |
| `--instui-color-background-warning` | `<color>` | `#CF4A00` |
| `--instui-color-institutional-brand-font-color-dark` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-color-institutional-brand-primary` | `<color>` | `light-dark(#1D354F, #EEF4FD)` |
| `--instui-color-stroke-accent-ash` | `<color>` | `light-dark(#273540, #C7CACD)` |
| `--instui-color-stroke-accent-aurora` | `<color>` | `light-dark(#057C58, #2BC692)` |
| `--instui-color-stroke-accent-blue` | `<color>` | `light-dark(#2871AF, #7FB4F1)` |
| `--instui-color-stroke-accent-green` | `<color>` | `light-dark(#037D37, #61C378)` |
| `--instui-color-stroke-accent-grey` | `<color>` | `light-dark(#4A5B68, #F2F4F5)` |
| `--instui-color-stroke-accent-honey` | `<color>` | `light-dark(#8C6400, #E0A300)` |
| `--instui-color-stroke-accent-orange` | `<color>` | `light-dark(#BB4200, #FF905A)` |
| `--instui-color-stroke-accent-plum` | `<color>` | `light-dark(#B43D89, #EC93C6)` |
| `--instui-color-stroke-accent-red` | `<color>` | `light-dark(#CF1F24, #FA917F)` |
| `--instui-color-stroke-accent-sea` | `<color>` | `light-dark(#027887, #3CC0D4)` |
| `--instui-color-stroke-accent-sky` | `<color>` | `light-dark(#17759F, #63B9EB)` |
| `--instui-color-stroke-accent-stone` | `<color>` | `light-dark(#6C6C6C, #AFAFAF)` |
| `--instui-color-stroke-accent-violet` | `<color>` | `light-dark(#944FB3, #CAA1D9)` |
| `--instui-color-stroke-base` | `<color>` | `light-dark(#8D959F, #6A7883)` |
| `--instui-color-stroke-brand` | `<color>` | `light-dark(#1D354F, #EEF4FD)` |
| `--instui-color-stroke-container-base` | `<color>` | `light-dark(#E8EAEC, #334450)` |
| `--instui-color-stroke-container-dark` | `<color>` | `#334450` |
| `--instui-color-stroke-error` | `<color>` | `#E62429` |
| `--instui-color-stroke-info` | `<color>` | `#2B7ABC` |
| `--instui-color-stroke-inverse` | `<color>` | `light-dark(#ffffff, #6A7883)` |
| `--instui-color-stroke-muted` | `<color>` | `light-dark(#E8EAEC, #2D3D49)` |
| `--instui-color-stroke-on-color` | `<color>` | `#ffffff` |
| `--instui-color-stroke-strong` | `<color>` | `light-dark(#5F6E7A, #9EA6AD)` |
| `--instui-color-stroke-success` | `<color>` | `#03893D` |
| `--instui-color-stroke-warning` | `<color>` | `#CF4A00` |
| `--instui-color-text-accent-ash` | `<color>` | `light-dark(#273540, #C7CACD)` |
| `--instui-color-text-accent-aurora` | `<color>` | `light-dark(#057C58, #2BC692)` |
| `--instui-color-text-accent-blue` | `<color>` | `light-dark(#2871AF, #7FB4F1)` |
| `--instui-color-text-accent-green` | `<color>` | `light-dark(#037D37, #61C378)` |
| `--instui-color-text-accent-grey` | `<color>` | `light-dark(#4A5B68, #F2F4F5)` |
| `--instui-color-text-accent-honey` | `<color>` | `light-dark(#8C6400, #E0A300)` |
| `--instui-color-text-accent-orange` | `<color>` | `light-dark(#BB4200, #FF905A)` |
| `--instui-color-text-accent-plum` | `<color>` | `light-dark(#B43D89, #EC93C6)` |
| `--instui-color-text-accent-red` | `<color>` | `light-dark(#CF1F24, #FA917F)` |
| `--instui-color-text-accent-sea` | `<color>` | `light-dark(#027887, #3CC0D4)` |
| `--instui-color-text-accent-sky` | `<color>` | `light-dark(#17759F, #63B9EB)` |
| `--instui-color-text-accent-stone` | `<color>` | `light-dark(#6C6C6C, #AFAFAF)` |
| `--instui-color-text-accent-violet` | `<color>` | `light-dark(#944FB3, #CAA1D9)` |
| `--instui-color-text-base` | `<color>` | `light-dark(#273540, #F2F4F5)` |
| `--instui-color-text-dark` | `<color>` | `#273540` |
| `--instui-color-text-error` | `<color>` | `light-dark(#CF1F24, #FA917F)` |
| `--instui-color-text-info` | `<color>` | `light-dark(#2871AF, #7FB4F1)` |
| `--instui-color-text-inverse` | `<color>` | `light-dark(#ffffff, #1C222B)` |
| `--instui-color-text-muted` | `<color>` | `light-dark(#576773, #AAB0B5)` |
| `--instui-color-text-on-color` | `<color>` | `#ffffff` |
| `--instui-color-text-success` | `<color>` | `light-dark(#037D37, #61C378)` |
| `--instui-color-text-warning` | `<color>` | `light-dark(#BB4200, #FF905A)` |
| `--instui-component-text-ai-background-color` | `<color>` | `light-dark(#F3E5F7, #6D3984)` |
| `--instui-component-text-ai-color` | `<color>` | `light-dark(#8A49A7, #F3E5F7)` |
| `--instui-component-text-base-on-color` | `<color>` | `#ffffff` |
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
| `--instui-component-text-inverse-color` | `<color>` | `light-dark(#ffffff, #1C222B)` |
| `--instui-component-text-legend-font-size` | `<length>` | `0.75rem` |
| `--instui-component-text-legend-font-weight` | `<integer>` | `400` |
| `--instui-component-text-legend-line-height` | `<percentage>` | `150%` |
| `--instui-component-text-muted-color` | `<color>` | `light-dark(#576773, #AAB0B5)` |
| `--instui-component-text-muted-on-color` | `<color>` | `#ffffff` |
| `--instui-component-text-primary-color` | `<color>` | `light-dark(#1D354F, #EEF4FD)` |
| `--instui-component-view-background-alert` | `<color>` | `#2B7ABC` |
| `--instui-component-view-background-danger` | `<color>` | `#E62429` |
| `--instui-component-view-background-primary` | `<color>` | `light-dark(#ffffff, #171B21)` |
| `--instui-component-view-background-primary-inverse` | `<color>` | `light-dark(#334450, #F2F4F5)` |
| `--instui-component-view-background-secondary` | `<color>` | `light-dark(#F2F4F5, #273540)` |
| `--instui-elevation-above` | `none \| <shadow>#` | — |
| `--instui-elevation-card` | `none \| <shadow>#` | — |
| `--instui-elevation-cardHover` | `none \| <shadow>#` | — |
| `--instui-elevation-depth1` | `none \| <shadow>#` | — |
| `--instui-elevation-depth2` | `none \| <shadow>#` | — |
| `--instui-elevation-depth3` | `none \| <shadow>#` | — |
| `--instui-elevation-resting` | `none \| <shadow>#` | — |
| `--instui-elevation-topmost` | `none \| <shadow>#` | — |
| `--instui-font-family-base` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-font-family-code` | `[ <font-family-name> \| <generic-font-family> ]#` | `Menlo, Consolas, Monaco, "Andale Mono", monospace` |
| `--instui-font-family-heading` | `[ <font-family-name> \| <generic-font-family> ]#` | `Inclusive Sans, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-font-size-text-base` | `<length>` | `1rem` |
| `--instui-font-size-text-lg` | `<length>` | `1.25rem` |
| `--instui-font-size-text-sm` | `<length>` | `0.875rem` |
| `--instui-font-size-text-xl` | `<length>` | `1.75rem` |
| `--instui-font-size-text-xs` | `<length>` | `0.75rem` |
| `--instui-font-size-text2xl` | `<length>` | `2.5rem` |
| `--instui-font-weight-body-base` | `<integer>` | `400` |
| `--instui-font-weight-body-strong` | `<integer>` | `600` |
| `--instui-font-weight-heading-base` | `<integer>` | `600` |
| `--instui-font-weight-heading-strong` | `<integer>` | `700` |
| `--instui-font-weight-interactive` | `<integer>` | `500` |
| `--instui-line-height-heading-base` | `<percentage>` | `125%` |
| `--instui-line-height-heading-loose` | `<percentage>` | `150%` |
| `--instui-line-height-heading-text-lg` | `<length>` | `1.75rem` |
| `--instui-line-height-heading-text-xl` | `<length>` | `2rem` |
| `--instui-line-height-heading-text2xl` | `<length>` | `2.25rem` |
| `--instui-line-height-heading-text3xl` | `<length>` | `2.5rem` |
| `--instui-line-height-label-base` | `<length>` | `1.125rem` |
| `--instui-line-height-paragraph-base` | `<percentage>` | `150%` |
| `--instui-line-height-paragraph-text-base` | `<length>` | `1.5rem` |
| `--instui-line-height-paragraph-text-sm` | `<length>` | `1.25rem` |
| `--instui-line-height-paragraph-text-xs` | `<length>` | `1.25rem` |
| `--instui-line-height-standalone-base` | `<percentage>` | `125%` |
| `--instui-line-height-standalone-text-base` | `<length>` | `1rem` |
| `--instui-line-height-standalone-text-lg` | `<length>` | `1.25rem` |
| `--instui-line-height-standalone-text-sm` | `<length>` | `0.875rem` |
| `--instui-line-height-standalone-text-xl` | `<length>` | `1.5rem` |
| `--instui-line-height-standalone-text-xs` | `<length>` | `0.75rem` |
| `--instui-line-height-standalone-text2xl` | `<length>` | `1.75rem` |
| `--instui-line-height-standalone-text3xl` | `<length>` | `2rem` |
| `--instui-line-height-standalone-text4xl` | `<length>` | `2.25rem` |
| `--instui-opacity-base` | `<integer>` | `1` |
| `--instui-opacity-disabled` | `<number>` | `0.5` |

