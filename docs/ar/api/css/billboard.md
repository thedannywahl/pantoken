# CSS: billboard

`.instui-billboard` — كتلة حالة فارغة كبيرة أو طلب إجراء: رمز بطل أو صورة، عنوان، ورسالة.

الأجزاء `.hero`/`.heading`/`.message` يتم إنشاؤها بواسطة الترميز الخاص بالمستهلك، وليس بنية مفروضة؛ `-clickable` يضيف فقط نمط الحوم، لذلك لا يزال هدف النقر الفعلي بحاجة إلى `tabindex` ومعالج لوحة المفاتيح.

**المصدر:** [billboard.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/billboard/billboard.css)

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/billboard.css";
```

## Examples

```html
<div class="instui-billboard -size-md -clickable" tabindex="0">
  <span class="hero -icon-inbox"></span>
  <div class="heading">No items yet</div>
  <div class="message">Create your first item to get started.</div>
</div>
```

## Structure

```text
.instui-billboard
  hero (component, 0..1)
  heading (component)
  .message
```

```mermaid
flowchart TD
  n0[".instui-billboard"]:::cssdoc-root
  n1(["hero"]):::cssdoc-component
  n2(["heading"]):::cssdoc-component
  n3(".message"):::cssdoc-part
  n0 -.->|0..1| n1
  n0 --> n2
  n0 --> n3
  click n1 "/api/css/hero.md"
  click n2 "/api/css/heading.md"
  classDef cssdoc-root fill:#eef2ff,stroke:#6366f1,color:#1e1b4b;
  classDef cssdoc-part fill:#f8fafc,stroke:#94a3b8,color:#0f172a;
  classDef cssdoc-slot fill:#f0fdf4,stroke:#4ade80,color:#14532d;
  classDef cssdoc-component fill:#fff7ed,stroke:#fb923c,color:#7c2d12;
```

## Modifiers

| Modifier        | Description                                                                         |
| --------------- | ----------------------------------------------------------------------------------- |
| `.-clickable`   | نمط تفاعلي (قابل للنقر) مع تعليقات الحوم.                                           |
| `.-icon-*`      | عرض رمز بطل على `.hero` (على سبيل المثال `<span class="hero -icon-inbox"></span>`). |
| `.-size-large`  | اسم مستعار طويل الشكل لـ {@link -size-lg}.                                          |
| `.-size-lg`     | كبير: تباعد أوسع مع عنوان أكبر ورسالة ورمز بطل.                                     |
| `.-size-md`     | متوسط (افتراضي): تباعد قياسي مع عنوان متوسط ورسالة ورمز بطل.                        |
| `.-size-medium` | اسم مستعار طويل الشكل لـ {@link -size-md}.                                          |
| `.-size-sm`     | صغير: تباعد أضيق مع عنوان أصغر ورسالة ورمز بطل.                                     |
| `.-size-small`  | اسم مستعار طويل الشكل لـ {@link -size-sm}.                                          |

## Parts

| Part       | Description                            |
| ---------- | -------------------------------------- |
| `.heading` | عنوان اللوحة الإعلانية.                |
| `.hero`    | الأيقونة أو الصورة الرائدة الاختيارية. |
| `.message` | الرسالة الداعمة.                       |

## Tokens consumed

| Token                                               | Type                                               | Value                                                                        |
| --------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------- |
| `--instui-color-text-base`                          | `<color>`                                          | `light-dark(#273540, #F2F4F5)`                                               |
| `--instui-component-billboard-background-color`     | `<color>`                                          | `#00000000`                                                                  |
| `--instui-component-billboard-button-border-radius` | `<length>`                                         | `0.5rem`                                                                     |
| `--instui-component-billboard-button-border-style`  | —                                                  | `solid`                                                                      |
| `--instui-component-billboard-button-border-width`  | `<length>`                                         | `0.125rem`                                                                   |
| `--instui-component-billboard-clickable-active-bg`  | `<color>`                                          | `light-dark(#44709F, #2E5177)`                                               |
| `--instui-component-billboard-font-family`          | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-billboard-large-margin`         | `<length>`                                         | `1.5rem`                                                                     |
| `--instui-component-billboard-medium-margin`        | `<length>`                                         | `0.75rem`                                                                    |
| `--instui-component-billboard-padding-large`        | `<length>`                                         | `1.5rem`                                                                     |
| `--instui-component-billboard-padding-medium`       | `<length>`                                         | `1.5rem`                                                                     |
| `--instui-component-billboard-padding-small`        | `<length>`                                         | `0.75rem`                                                                    |
| `--instui-component-icon-illu-lg`                   | `<length>`                                         | `10rem`                                                                      |
| `--instui-component-icon-illu-md`                   | `<length>`                                         | `5rem`                                                                       |
| `--instui-component-icon-illu-sm`                   | `<length>`                                         | `3rem`                                                                       |
| `--instui-component-link-on-color-text-color`       | `<color>`                                          | `#ffffff`                                                                    |
| `--instui-component-link-text-color`                | `<color>`                                          | `light-dark(#2369A4, #7FB4F1)`                                               |
| `--instui-component-text-font-size-x-x-large`       | `<length>`                                         | `2.375rem`                                                                   |
| `--instui-focus-outline-color`                      | `auto \| <color>`                                  | —                                                                            |
| `--instui-focus-outline-offset`                     | `<length>`                                         | —                                                                            |
| `--instui-focus-outline-style`                      | `auto \| <outline-line-style>`                     | —                                                                            |
| `--instui-focus-outline-width`                      | `<line-width>`                                     | —                                                                            |
| `--instui-font-size-text-base`                      | `<length>`                                         | `1rem`                                                                       |
| `--instui-font-size-text-sm`                        | `<length>`                                         | `0.875rem`                                                                   |
| `--instui-spacing-space-sm`                         | `<length>`                                         | `0.5rem`                                                                     |
| `--instui-spacing-space-xs`                         | `<length>`                                         | `0.25rem`                                                                    |

## Browser support

- يحتوي على أنماط عنصره مع قاعدة CSS `@scope`؛ يتطلب إصدارًا حديثًا من Chromium أو Firefox أو Safari.

## Subcomponents

- [heading](/ar/api/css/heading.md)
- [hero](/ar/api/css/hero.md)
