# CSS: gap

`.--gap-md` — أدوات `gap` الخاصة بـ Flex/grid على سلم التباعد، صيغة قصيرة (`--gap-sm`) أو طويلة (`--gap-small`). قابلة للاستخدام بمفردها أو مرتبطة بأي مكوّن (`.instui-view.--gap-sm`) — قد يتم تجاوز `gap` التي يعيّنها المكوّن نفسه من رمز مكوّن محدد.

**المصدر:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/gap/index.ts)

## الاستخدام

```css
@import "@pantoken/components/utilities.css";
```

## عرض توضيحي

```demo
self:gap
```

## أمثلة

```html
<div class="--display-flex --gap-sm">
  <span>One</span>
  <span>Two</span>
</div>
```

## المعدّلات

| معدّل | الوصف |
| --- | --- |
| `.--gap-md` | يطبّق رمز التباعد المتوسط كفاصل. |
| `.--gap-*` | أدوات الفجوة عبر صيغ تهجئة خطوات التباعد القصيرة والطويلة. |

## الرموز المستهلكة

| رمز | نوع | قيمة |
| --- | --- | --- |
| `--instui-component-shared-tokens-spacing-general-space-none` | `<length>` | `0rem` |
| `--instui-spacing-space-lg` | `<length>` | `1rem` |
| `--instui-spacing-space-md` | `<length>` | `0.75rem` |
| `--instui-spacing-space-sm` | `<length>` | `0.5rem` |
| `--instui-spacing-space-xl` | `<length>` | `1.5rem` |
| `--instui-spacing-space-xs` | `<length>` | `0.25rem` |
| `--instui-spacing-space2xl` | `<length>` | `2rem` |
| `--instui-spacing-space2xs` | `<length>` | `0.125rem` |

