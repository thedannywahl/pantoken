# CSS: text-area

`.instui-text-area` — A styled, resizable native `&lt;textarea&gt;` with the same states and sizes as the text input.

Shares its border, background, and focus states with `text-input` and `simple-select`; only `resize: vertical` and the taller minimum height are unique to it.

**Source:** [text-area.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/text-area/text-area.css)

## Användning

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/text-area.css";
```

## Exempel

```html
<textarea class="instui-text-area" placeholder="Write a comment…"></textarea>
```

## Modifierare

| Modifierare | Beskrivning |
| --- | --- |
| `.-disabled` | Disabled state. |
| `.-invalid` | Invalid (error) state. |
| `.-readonly` | Read-only state. |
| `.-size-large` | Large. Long-form alias of `-size-lg`. |
| `.-size-lg` | Large. |
| `.-size-md` | (default) Medium. |
| `.-size-medium` | (default) Medium. Long-form alias of `-size-md`. |
| `.-size-sm` | Small. |
| `.-size-small` | Small. Long-form alias of `-size-sm`. |
| `.-success` | Success (valid) state. |

## Pseudo-element

| Pseudo-element | Beskrivning |
| --- | --- |
| `::placeholder` | The placeholder text, in a muted color that shifts on hover. |

## Tillstånd

| Tillstånd | Beskrivning |
| --- | --- |
| `:disabled` | — |

## Förbrukade tokens

| Token | Typ | Värde |
| --- | --- | --- |
| `--instui-component-text-area-background-color` | `<color>` | `light-dark(#ffffff, #171B21)` |
| `--instui-component-text-area-background-disabled-color` | `<color>` | `light-dark(#E8EAEC, #334450)` |
| `--instui-component-text-area-background-hover-color` | `<color>` | `light-dark(#ffffff, #171B21)` |
| `--instui-component-text-area-background-readonly-color` | `<color>` | `light-dark(#C7CACD, #6A7883)` |
| `--instui-component-text-area-border-color` | `<color>` | `light-dark(#7E8792, #5F6E7A)` |
| `--instui-component-text-area-border-disabled-color` | `<color>` | `light-dark(#C7CACD, #4A5B68)` |
| `--instui-component-text-area-border-hover-color` | `<color>` | `light-dark(#334450, #7E8792)` |
| `--instui-component-text-area-border-radius` | `<length>` | `0.75rem` |
| `--instui-component-text-area-border-readonly-color` | `<color>` | `#8D959F` |
| `--instui-component-text-area-border-width` | `<length>` | `0.0625rem` |
| `--instui-component-text-area-error-border-color` | `<color>` | `#CF1F24` |
| `--instui-component-text-area-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-text-area-font-size-lg` | `<length>` | `1.25rem` |
| `--instui-component-text-area-font-size-md` | `<length>` | `1rem` |
| `--instui-component-text-area-font-size-sm` | `<length>` | `0.875rem` |
| `--instui-component-text-area-font-weight` | `<integer>` | `400` |
| `--instui-component-text-area-padding` | `<length>` | `0.75rem` |
| `--instui-component-text-area-placeholder-color` | `<color>` | `light-dark(#5F6E7A, #7E8792)` |
| `--instui-component-text-area-placeholder-hover-color` | `<color>` | `light-dark(#334450, #9EA6AD)` |
| `--instui-component-text-area-success-border-color` | `<color>` | `light-dark(#037D37, #3EA75B)` |
| `--instui-component-text-area-text-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-component-text-area-text-disabled-color` | `<color>` | `light-dark(#8D959F, #9EA6AD)` |
| `--instui-component-text-area-text-readonly-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-focus-outline-color-danger` | `auto \| <color>` | — |
| `--instui-focus-outline-color-success` | `auto \| <color>` | — |

## Relaterat

- [text-input](/sv/api/css/text-input.md) — The single-line counterpart with the same states and sizes.

