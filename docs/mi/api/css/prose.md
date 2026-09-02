# CSS: prose

`:where(body)` — Typographic defaults for raw HTML — headings, paragraphs, lists, links, and code — applied automatically wherever it's imported (default `:where(body)`); pass `options.scope` to target a different content root instead (e.g. `.vp-doc`).

**Source:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/rules/prose/index.ts)

## Ngā Whakamahi

```css
@import "@pantoken/components/prose.css";
```

## Whakaaturanga

```demo
self:prose
```

## Ngā tauira

```html
<article>
  <h2>Release notes</h2>
  <p>Body copy with a <a href="/">link</a>.</p>
</article>
```

## Ngā tohu i whakamahia

| Tohu | Momo | Uara |
| --- | --- | --- |
| `--instui-border-radius-md` | `<length>` | `0.5rem` |
| `--instui-border-radius-sm` | `<length>` | `0.25rem` |
| `--instui-border-width-lg` | `<length>` | `0.25rem` |
| `--instui-border-width-md` | `<length>` | `0.125rem` |
| `--instui-border-width-sm` | `<length>` | `0.0625rem` |
| `--instui-color-background-container` | `<color>` | `light-dark(#ffffff, #1C222B)` |
| `--instui-color-background-muted` | `<color>` | `light-dark(#F2F4F5, #273540)` |
| `--instui-color-stroke-base` | `<color>` | `light-dark(#8D959F, #6A7883)` |
| `--instui-color-text-base` | `<color>` | `light-dark(#273540, #F2F4F5)` |
| `--instui-color-text-interactive-navigation-primary-base` | `<color>` | `light-dark(#2369A4, #7FB4F1)` |
| `--instui-color-text-interactive-navigation-primary-hover` | `<color>` | `light-dark(#1A5281, #ACCDF7)` |
| `--instui-color-text-muted` | `<color>` | `light-dark(#576773, #AAB0B5)` |
| `--instui-component-heading-base-color` | `<color>` | `light-dark(#273540, #ffffff)` |
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
| `--instui-component-heading-line-height` | `<percentage>` | `125%` |
| `--instui-component-table-background` | `<color>` | `light-dark(#ffffff, #10141A)` |
| `--instui-component-table-cell-color` | `<color>` | `light-dark(#273540, #F2F4F5)` |
| `--instui-component-table-cell-line-height` | `<percentage>` | `125%` |
| `--instui-component-table-cell-padding-horizontal` | `<length>` | `0.75rem` |
| `--instui-component-table-cell-padding-vertical` | `<length>` | `0.5rem` |
| `--instui-component-table-col-header-background` | `<color>` | `light-dark(#ffffff, #10141A)` |
| `--instui-component-table-col-header-color` | `<color>` | `light-dark(#273540, #F2F4F5)` |
| `--instui-component-table-col-header-padding-horizontal` | `<length>` | `0.75rem` |
| `--instui-component-table-col-header-padding-vertical` | `<length>` | `0.5rem` |
| `--instui-component-table-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-component-table-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-table-font-size` | `<length>` | `1rem` |
| `--instui-component-table-head-font-weight` | `<integer>` | `600` |
| `--instui-component-table-row-border-color` | `<color>` | `light-dark(#8D959F, #6A7883)` |
| `--instui-component-text-base-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-component-text-content-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-text-content-font-size` | `<length>` | `1rem` |
| `--instui-component-text-content-font-weight` | `<integer>` | `400` |
| `--instui-component-text-content-important-font-weight` | `<integer>` | `600` |
| `--instui-component-text-content-line-height` | `<percentage>` | `150%` |
| `--instui-component-text-content-quote-font-size` | `<length>` | `1rem` |
| `--instui-component-text-content-quote-font-style` | — | `italic` |
| `--instui-component-text-content-quote-font-weight` | `<integer>` | `500` |
| `--instui-component-text-content-quote-line-height` | `<percentage>` | `150%` |
| `--instui-component-text-content-small-font-size` | `<length>` | `0.875rem` |
| `--instui-font-family-code` | `[ <font-family-name> \| <generic-font-family> ]#` | `Menlo, Consolas, Monaco, "Andale Mono", monospace` |
| `--instui-spacing-space-lg` | `<length>` | `1rem` |
| `--instui-spacing-space-md` | `<length>` | `0.75rem` |
| `--instui-spacing-space-sm` | `<length>` | `0.5rem` |
| `--instui-spacing-space-xs` | `<length>` | `0.25rem` |
| `--instui-spacing-space2xs` | `<length>` | `0.125rem` |

## Hono

- [text](/mi/api/css/text.md)
- [heading](/mi/api/css/heading.md)
- [list](/mi/api/css/list.md)

