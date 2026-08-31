# CSS: in-place-edit

`.instui-in-place-edit` — [contenteditable] التي تُقرأ كنص حتى يتم التركيز عليها، ثم تعرض إدخال Chrome.

يظهر إدخال Chrome فقط أثناء التركيز؛ `-readonly` يمنع كلاً من تأثيرات التحويم والتركيز بحيث يُقرأ العنصر دائماً كنص مضمّن عادي.

**المصدر:** [in-place-edit.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/in-place-edit/in-place-edit.css)

<!-- js-requirement -->

> [!TIP]
> **JS Enhancement** — يتم عرض CSS الخاص بهذا المكون والعمل بشكل مستقل؛ اجمعه مع `@pantoken/interactions` لإضافة السلوك التفاعلي. راجع [جدول المعدلات أدناه](#modifiers).

## Accessibility

أعط العنصر القابل للتحرير `role="textbox"` واسماً يمكن الوصول إليه (`aria-label`).

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/in-place-edit.css";
```

## Demo

```demo
self:in-place-edit
```

## Examples

```html
<span class="instui-in-place-edit" contenteditable="true" role="textbox" aria-label="Project name"
  >Untitled</span
>
```

## Modifiers

| Modifier     | Description                                                            |
| ------------ | ---------------------------------------------------------------------- |
| `.-readonly` | معروض على الخط الفوري ولكن غير قابل للتحرير (بدون تأثيرات مؤشر/تركيز). |

## Tokens consumed

| Token                                            | Type                           | Value                          |
| ------------------------------------------------ | ------------------------------ | ------------------------------ |
| `--instui-color-background-muted`                | `<color>`                      | `light-dark(#F2F4F5, #273540)` |
| `--instui-color-text-base`                       | `<color>`                      | `light-dark(#273540, #F2F4F5)` |
| `--instui-component-text-input-background-color` | `<color>`                      | `light-dark(#ffffff, #171B21)` |
| `--instui-component-text-input-border-color`     | `<color>`                      | `light-dark(#7E8792, #5F6E7A)` |
| `--instui-component-text-input-border-radius`    | `<length>`                     | `0.75rem`                      |
| `--instui-component-text-input-border-width`     | `<length>`                     | `0.0625rem`                    |
| `--instui-focus-outline-color`                   | `auto \| <color>`              | —                              |
| `--instui-focus-outline-offset`                  | `<length>`                     | —                              |
| `--instui-focus-outline-style`                   | `auto \| <outline-line-style>` | —                              |
| `--instui-focus-outline-width`                   | `<line-width>`                 | —                              |
| `--instui-spacing-space-xs`                      | `<length>`                     | `0.25rem`                      |
| `--instui-spacing-space2xs`                      | `<length>`                     | `0.125rem`                     |

## Related

- [text-input](/ar/api/css/text-input.md) — عند التركيز، يعرض نفس واجهة الإدخال المعدنية مثل إدخال النص.
