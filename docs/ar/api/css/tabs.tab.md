# CSS: tabs.tab

`.tab` — زر علامة تبويب واحدة (InstUI `Tabs.Tab`، يتم تكوينها عبر قائمة علامات التبويب الخاصة بـ `Tabs` الأب); `-selected` يميز النشط.

يعيد تعديل `-variant-secondary` من `tabs` الأب تنسيق هذا العضو إلى علامة تبويب "مجلد" مستديرة — انظر إلى المستند الخاص به `tabs` لهذا التعديل.

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/tabs.tab.css";
```

## Modifiers

| Modifier     | Description                                                       |
| ------------ | ----------------------------------------------------------------- |
| `.-disabled` | غير تفاعلي؛ نفس التنسيق مثل `[aria-disabled="true"]`/`:disabled`. |
| `.-selected` | علامة التبويب النشطة؛ نفس التنسيق مثل `[aria-selected="true"]`.   |

## States

| State                    | Description |
| ------------------------ | ----------- |
| `[aria-disabled="true"]` | —           |
| `[aria-selected="true"]` | —           |
| `:disabled`              | —           |
| `:state(selected)`       | —           |

## Tokens consumed

| Token                                                         | Type                                               | Value                                                                        |
| ------------------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------- |
| `--instui-component-tabs-panel-border-width`                  | `<length>`                                         | `0.0625rem`                                                                  |
| `--instui-component-tabs-tab-default-hover-border-color`      | `<color>`                                          | `light-dark(#8D959F, #6A7883)`                                               |
| `--instui-component-tabs-tab-default-selected-border-color`   | `<color>`                                          | `light-dark(#1D354F, #EEF4FD)`                                               |
| `--instui-component-tabs-tab-default-text-color`              | `<color>`                                          | `light-dark(#273540, #ffffff)`                                               |
| `--instui-component-tabs-tab-font-family`                     | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-tabs-tab-font-size`                       | `<length>`                                         | `1rem`                                                                       |
| `--instui-component-tabs-tab-font-weight`                     | `<integer>`                                        | `400`                                                                        |
| `--instui-component-tabs-tab-line-height`                     | `<percentage>`                                     | `125%`                                                                       |
| `--instui-component-tabs-tab-secondary-selected-background`   | `<color>`                                          | `light-dark(#1D354F, #EEF4FD)`                                               |
| `--instui-component-tabs-tab-secondary-selected-border-color` | `<color>`                                          | `light-dark(#1D354F, #EEF4FD)`                                               |
| `--instui-component-tabs-tab-secondary-selected-text-color`   | `<color>`                                          | `light-dark(#ffffff, #1C222B)`                                               |
| `--instui-component-tabs-tab-secondary-text-color`            | `<color>`                                          | `light-dark(#273540, #ffffff)`                                               |
