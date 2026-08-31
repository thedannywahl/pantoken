# CSS: context-view

`.instui-context-view` — استدعاء مرتفع مع علامة مقحم، قابل للموضع على أي جانب؛ يعمل كـ `[popover]` أصلي.

علامة المقحم هي مثلثات `::before`/`::after` مكدسة (حد ثم تعبئة) لذا تقرأ بشكل صحيح ضد سطح متطابق؛ كـ `[popover]` فإنها تحتاج إلى نفس توصيل open/`popovertarget` مثل `popover`، لكن على عكس `tooltip`، فإنها تستبعد عند النقر خارج أو Escape.

**المصدر:** [context-view.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/context-view/context-view.css)

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/context-view.css";
```

## Examples

```html
<div class="instui-context-view -placement-bottom" id="cv-popover">
  A context view frames a callout with a caret. As a popover it rides the top layer and closes when
  you click away or press Esc.
</div>
```

## Modifiers

| Modifier             | Description                             |
| -------------------- | --------------------------------------- |
| `.-color-inverse`    | نظام ألوان داكن (معكوس).                |
| `.-placement-bottom` | اجلس أسفل المرساة.                      |
| `.-placement-end`    | اجلس في النهاية (inline-end) للمرساة.   |
| `.-placement-start`  | اجلس في البداية (inline-start) للمرساة. |
| `.-placement-top`    | اجلس فوق المرساة.                       |

## Pseudo-elements

| Pseudo-element | Description                       |
| -------------- | --------------------------------- |
| `::after`      | يرسم مثلث التعبئة الداخلي للمقحم. |
| `::before`     | يرسم مثلث الحد الخارجي للمقحم.    |

## States

| State          | Description |
| -------------- | ----------- |
| `:state(open)` | —           |

## Conditions

| Type     | Query                        | Description |
| -------- | ---------------------------- | ----------- |
| supports | `(position-area: block-end)` | —           |

## Tokens consumed

| Token                                                            | Type                | Value                          |
| ---------------------------------------------------------------- | ------------------- | ------------------------------ |
| `--instui-color-background-elevated-surface-base`                | `<color>`           | `light-dark(#ffffff, #171B21)` |
| `--instui-color-background-inverse`                              | `<color>`           | `light-dark(#334450, #F2F4F5)` |
| `--instui-color-text-base`                                       | `<color>`           | `light-dark(#273540, #F2F4F5)` |
| `--instui-color-text-inverse`                                    | `<color>`           | `light-dark(#ffffff, #1C222B)` |
| `--instui-component-context-view-arrow-background-color`         | `<color>`           | `light-dark(#ffffff, #171B21)` |
| `--instui-component-context-view-arrow-background-color-inverse` | `<color>`           | `light-dark(#334450, #F2F4F5)` |
| `--instui-component-context-view-arrow-border-color`             | `<color>`           | `light-dark(#E8EAEC, #2D3D49)` |
| `--instui-component-context-view-arrow-border-color-inverse`     | `<color>`           | `#00000000`                    |
| `--instui-component-context-view-arrow-border-width`             | `<length>`          | `0.0625rem`                    |
| `--instui-component-context-view-arrow-size`                     | `<length>`          | `0.5rem`                       |
| `--instui-component-context-view-border-radius`                  | `<length>`          | `0.75rem`                      |
| `--instui-elevation-above`                                       | `none \| <shadow>#` | —                              |
| `--instui-spacing-space-lg`                                      | `<length>`          | `1rem`                         |
| `--instui-spacing-space-md`                                      | `<length>`          | `0.75rem`                      |

## Browser support

- يستخدم موضع المرساة CSS (`position-anchor`، `position-area`، `position-try-fallbacks`) و API الأصلي `[popover]` خلف حماية `@supports`؛ يحتاج إلى Chromium أو Safari حديثة، وينقطع إلى popover مركزي UA في مكان آخر.

## Related

- [popover](/ar/api/css/popover.md) — popover طبقة القمة العامة.
- [tooltip](/ar/api/css/tooltip.md) — استدعاء hover أو focus أصغر.
