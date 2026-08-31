# CSS: pill

`.instui-pill` — تسمية حالة مضغوطة؛ أضف رموز رسومية رائدة مع نموذج `-icon-&lt;name&gt;` المشترك.

بخلاف `badge`، الذي يعرض عدداً، أو `tag`، الذي يمكن إزالته، فإن الحبة هي تسمية حالة ثابتة؛ الرموز الرسومية الرائدة لها `::before` مقنعة، وليست `&lt;img&gt;`.

**المصدر:** [pill.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/pill/pill.css)

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/pill.css";
```

## Examples

```html
<div class="instui-pill --display-flex" style="gap: 12px;">
  <span class="instui-pill -color-success -icon-check">Published</span>
  <span class="instui-pill">Draft</span>
  <span class="instui-pill -color-info">In review</span>
  <span class="instui-pill -color-warning">Stale</span>
  <span class="instui-pill -color-danger">Blocked</span>
</div>
```

## Modifiers

| Modifier               | Description                                                                                                                                                         |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.-color-danger`       | حالة الخطأ.                                                                                                                                                         |
| `.-color-info`         | الحالة المعلوماتية.                                                                                                                                                 |
| `.-color-success`      | الحالة الإيجابية.                                                                                                                                                   |
| `.-color-warning`      | حالة التحذير.                                                                                                                                                       |
| `.-icon-*`             | رموز رسومية رائدة من مجموعة الرموز (مثل `-icon-check`)، المرسومة قبل التسمية.                                                                                       |
| `.-render-icon-<name>` | <span class="instui-pill -color-danger pantoken-doc-tag">Deprecated</span> — The former `renderIcon` prop; still works as an alias, but use `-icon-<name>` instead. |

## Pseudo-elements

| Pseudo-element | Description                                      |
| -------------- | ------------------------------------------------ |
| `::before`     | الرموز الرسومية للرمز الرائد، بحجم وتباعد للحبة. |

## Tokens consumed

| Token                                              | Type                                               | Value                                                                        |
| -------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------- |
| `--instui-component-pill-background-color`         | `<color>`                                          | `light-dark(#ffffff, #10141A)`                                               |
| `--instui-component-pill-base-border-color`        | `<color>`                                          | `light-dark(#8D959F, #6A7883)`                                               |
| `--instui-component-pill-base-text-color`          | `<color>`                                          | `light-dark(#273540, #F2F4F5)`                                               |
| `--instui-component-pill-border-radius`            | `<length>`                                         | `0.5rem`                                                                     |
| `--instui-component-pill-border-style`             | —                                                  | `solid`                                                                      |
| `--instui-component-pill-border-width`             | `<length>`                                         | `0.0625rem`                                                                  |
| `--instui-component-pill-error-border-color`       | `<color>`                                          | `#E62429`                                                                    |
| `--instui-component-pill-error-text-color`         | `<color>`                                          | `light-dark(#CF1F24, #FA917F)`                                               |
| `--instui-component-pill-font-family`              | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-pill-height`                   | `<length>`                                         | `24px`                                                                       |
| `--instui-component-pill-info-border-color`        | `<color>`                                          | `#2B7ABC`                                                                    |
| `--instui-component-pill-info-text-color`          | `<color>`                                          | `light-dark(#2871AF, #7FB4F1)`                                               |
| `--instui-component-pill-line-height`              | `<length>`                                         | `0.875rem`                                                                   |
| `--instui-component-pill-max-width`                | `<length>`                                         | `240px`                                                                      |
| `--instui-component-pill-padding-horizontal`       | `<length>`                                         | `0.5rem`                                                                     |
| `--instui-component-pill-status-label-font-weight` | `<integer>`                                        | `600`                                                                        |
| `--instui-component-pill-success-border-color`     | `<color>`                                          | `#03893D`                                                                    |
| `--instui-component-pill-success-text-color`       | `<color>`                                          | `light-dark(#037D37, #61C378)`                                               |
| `--instui-component-pill-text-font-size`           | `<length>`                                         | `0.875rem`                                                                   |
| `--instui-component-pill-text-font-weight`         | `<integer>`                                        | `600`                                                                        |
| `--instui-component-pill-warning-border-color`     | `<color>`                                          | `#CF4A00`                                                                    |
| `--instui-component-pill-warning-text-color`       | `<color>`                                          | `light-dark(#BB4200, #FF905A)`                                               |
| `--instui-font-size-text-xs`                       | `<length>`                                         | `0.75rem`                                                                    |

## Related

- [badge](/ar/api/css/badge.md) — شارة هي نظير العد أو الإخطار.
- [tag](/ar/api/css/tag.md) — العلامة هي نظير قابل للإزالة وموجه نحو النموذج.
