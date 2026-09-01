# CSS: tabs.tab

`.tab` — زر تبويب مفرد (InstUI `Tabs.Tab`، مُكوَّن عبر قائمة علامات التبويب للوالد `Tabs`); `-selected` يشير إلى العنصر النشط.

مُعدِّل `-variant-secondary` في الوالد `tabs` يعيد تنسيق هذا العضو إلى تبويب "مجلد" مستدير — راجع توثيق `tabs` الخاص بهذا المُعدِّل.

## الاستخدام

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/tabs.tab.css";
```

## المعدّلات

| معدّل | الوصف |
| --- | --- |
| `.-disabled` | غير تفاعلي؛ نفس تنسيق العرض مثل `[aria-disabled="true"]`/`:disabled`. |
| `.-selected` | تبويب نشط؛ نفس تنسيق العرض مثل `[aria-selected="true"]`. |

## الحالات

| حالة | الوصف |
| --- | --- |
| `[aria-disabled="true"]` | — |
| `[aria-selected="true"]` | — |
| `:disabled` | — |
| `:state(selected)` | — |

## الرموز المستهلكة

| رمز | نوع | قيمة |
| --- | --- | --- |
| `--instui-component-tabs-panel-border-width` | `<length>` | `0.0625rem` |
| `--instui-component-tabs-tab-default-hover-border-color` | `<color>` | `light-dark(#8D959F, #6A7883)` |
| `--instui-component-tabs-tab-default-selected-border-color` | `<color>` | `light-dark(#1D354F, #EEF4FD)` |
| `--instui-component-tabs-tab-default-text-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-component-tabs-tab-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-tabs-tab-font-size` | `<length>` | `1rem` |
| `--instui-component-tabs-tab-font-weight` | `<integer>` | `400` |
| `--instui-component-tabs-tab-line-height` | `<percentage>` | `125%` |
| `--instui-component-tabs-tab-secondary-selected-background` | `<color>` | `light-dark(#1D354F, #EEF4FD)` |
| `--instui-component-tabs-tab-secondary-selected-border-color` | `<color>` | `light-dark(#1D354F, #EEF4FD)` |
| `--instui-component-tabs-tab-secondary-selected-text-color` | `<color>` | `light-dark(#ffffff, #1C222B)` |
| `--instui-component-tabs-tab-secondary-text-color` | `<color>` | `light-dark(#273540, #ffffff)` |

