# CSS: tabs.tab

`.tab` — En enkelt faneknap (InstUI `Tabs.Tab`, konfigureret via forælderen `Tabs`'s fane liste); `-selected` markerer den aktive.

Forælderen `tabs`'s `-variant-secondary` modifier restyler dette medlem til en afrundet "folder"-fane — se `tabs`'s egen dokumentation for denne modifier.

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/tabs.tab.css";
```

## Modifiers

| Modifier     | Description                                                           |
| ------------ | --------------------------------------------------------------------- |
| `.-disabled` | Ikke-interaktiv; samme stil som `[aria-disabled="true"]`/`:disabled`. |
| `.-selected` | Den aktive fane; samme stil som `[aria-selected="true"]`.             |

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
