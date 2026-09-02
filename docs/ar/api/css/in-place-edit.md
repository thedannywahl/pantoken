# CSS: in-place-edit

`.instui-in-place-edit` — عنصر قابل للتحرير ([contenteditable]) يُقرأ كنص حتى يتم تركيزه، ثم يظهر مظهر الإدخال.

يظهر مظهر الإدخال فقط أثناء التركيز؛ `-readonly` يمنع كلًّا من مؤشرات التحويم والتركيز لذا يظل العنصر مقروءًا دائمًا كنص مضمن عادي.

**المصدر:** [in-place-edit.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/in-place-edit/in-place-edit.css)

<!-- js-requirement -->
> [!TIP]
> **تحسين JS** — يُقدِّم CSS الخاص بهذا المكوّن العرض والوظيفة بمفرده؛ اقترنه بـ `@pantoken/interactions` لإضافة السلوك التفاعلي. راجع [جدول المعدِّلات أدناه](#modifiers).


## سهولة الوصول

أعطِ العنصر القابل للتعديل `role="textbox"` واسمًا يمكن الوصول إليه (`aria-label`).

## الاستخدام

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/in-place-edit.css";
```

## عرض توضيحي

```demo
self:in-place-edit
```

## أمثلة

```html
<span class="instui-in-place-edit" contenteditable="true" role="textbox" aria-label="Project name">Untitled</span>
```

## المعدّلات

| معدّل | الوصف |
| --- | --- |
| `.-readonly` | معروض مضمنًا لكنه غير قابل للتعديل (بدون مؤشرات تحويم/تركيز). |

## الرموز المستهلكة

| رمز | نوع | قيمة |
| --- | --- | --- |
| `--instui-color-background-muted` | `<color>` | `light-dark(#F2F4F5, #273540)` |
| `--instui-color-text-base` | `<color>` | `light-dark(#273540, #F2F4F5)` |
| `--instui-component-text-input-background-color` | `<color>` | `light-dark(#ffffff, #171B21)` |
| `--instui-component-text-input-border-color` | `<color>` | `light-dark(#7E8792, #5F6E7A)` |
| `--instui-component-text-input-border-radius` | `<length>` | `0.75rem` |
| `--instui-component-text-input-border-width` | `<length>` | `0.0625rem` |
| `--instui-focus-outline-color` | `auto \| <color>` | — |
| `--instui-focus-outline-offset` | `<length>` | — |
| `--instui-focus-outline-style` | `auto \| <outline-line-style>` | — |
| `--instui-focus-outline-width` | `<line-width>` | — |
| `--instui-spacing-space-xs` | `<length>` | `0.25rem` |
| `--instui-spacing-space2xs` | `<length>` | `0.125rem` |

## ذات صلة

- [text-input](/ar/api/css/text-input.md) — عند التركيز يظهر نفس مظهر الإدخال مثل حقل النص.

