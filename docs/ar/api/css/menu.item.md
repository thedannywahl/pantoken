# CSS: menu.item

`.item` — عنصر قائمة (InstUI `Menu.Item`); أضف -disabled أو -highlighted أو -active/[aria-checked].

## سهولة الوصول

وسّم عنصرًا محددًا باستخدام `aria-checked="true"` (نفس تنسيق `-active`).

## الاستخدام

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/menu.item.css";
```

## المعدّلات

| معدّل | الوصف |
| --- | --- |
| `.-active` | تسليط الضوء للنشاط/التحديد؛ نفس تنسيق `[aria-checked="true"]`. |
| `.-disabled` | باهت، غير تفاعلي. |
| `.-highlighted` | خلفية/نص مميّز (تركيز لوحة المفاتيح أو تحويم). |

## الأجزاء

| جزء | الوصف |
| --- | --- |
| `.item-info` | نص معلومات ثانوي داخل العنصر. |

## الحالات

| حالة | الوصف |
| --- | --- |
| `[aria-checked="true"]` | — |

## الرموز المستهلكة

| رمز | نوع | قيمة |
| --- | --- | --- |
| `--instui-component-menu-item-active-background` | `<color>` | `light-dark(#1D354F, #EEF4FD)` |
| `--instui-component-menu-item-active-label-color` | `<color>` | `light-dark(#ffffff, #1D354F)` |
| `--instui-component-menu-item-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-menu-item-font-size` | `<length>` | `1rem` |
| `--instui-component-menu-item-font-weight` | `<integer>` | `400` |
| `--instui-component-menu-item-highlighted-background` | `<color>` | `light-dark(#EEF4FD, #2E5177)` |
| `--instui-component-menu-item-highlighted-label-color` | `<color>` | `light-dark(#273540, #F2F4F5)` |
| `--instui-component-menu-item-highlighted-label-info-color` | `<color>` | `light-dark(#273540, #F2F4F5)` |
| `--instui-component-menu-item-label-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-component-menu-item-label-info-color` | `<color>` | `light-dark(#576773, #AAB0B5)` |
| `--instui-component-menu-item-line-height` | `<length>` | `1.25rem` |
| `--instui-component-menu-item-padding-horizontal` | `<length>` | `0.75rem` |
| `--instui-component-menu-item-padding-vertical` | `<length>` | `0.5rem` |
| `--instui-component-menu-item-selected-highlighted-background` | `<color>` | `light-dark(#234465, #ffffff)` |
| `--instui-opacity-disabled` | `<number>` | `0.5` |

