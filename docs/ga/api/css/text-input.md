# CSS: text-input

`.instui-text-input` — A styled native `&lt;input&gt;` — including `date`, `time`, and `datetime-local`, where the browser supplies the picker — with validation states and sizes.

Shares its border, background, and state chrome with `text-area`, `simple-select`, `number-input`, and `input-group`; for `date`/`time`/`datetime-local` types the browser supplies its own picker UI, which this stylesheet doesn't style.

**Source:** [text-input.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/text-input/text-input.css)

## Úsáid

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/text-input.css";
```

## Samplaí

```html
<input class="instui-text-input" placeholder="Default">
```

## Modhnóirí

| Modhnóir | Cur síos |
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

## Fo-eilimintí

| Fo-eilimint | Cur síos |
| --- | --- |
| `::placeholder` | The placeholder text, in a muted color that shifts on hover. |

## Stáit

| Stát | Cur síos |
| --- | --- |
| `:disabled` | — |

## Tóicíní a úsáideadh

| Tóicín | Cineál | Luach |
| --- | --- | --- |
| `--instui-component-text-input-background-color` | `<color>` | `light-dark(#ffffff, #171B21)` |
| `--instui-component-text-input-background-disabled-color` | `<color>` | `light-dark(#E8EAEC, #334450)` |
| `--instui-component-text-input-background-hover-color` | `<color>` | `light-dark(#ffffff, #171B21)` |
| `--instui-component-text-input-background-readonly-color` | `<color>` | `light-dark(#C7CACD, #6A7883)` |
| `--instui-component-text-input-border-color` | `<color>` | `light-dark(#7E8792, #5F6E7A)` |
| `--instui-component-text-input-border-disabled-color` | `<color>` | `light-dark(#C7CACD, #4A5B68)` |
| `--instui-component-text-input-border-hover-color` | `<color>` | `light-dark(#334450, #7E8792)` |
| `--instui-component-text-input-border-radius` | `<length>` | `0.75rem` |
| `--instui-component-text-input-border-readonly-color` | `<color>` | `#8D959F` |
| `--instui-component-text-input-border-width` | `<length>` | `0.0625rem` |
| `--instui-component-text-input-error-border-color` | `<color>` | `light-dark(#CF1F24, #F56050)` |
| `--instui-component-text-input-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-text-input-font-size-lg` | `<length>` | `1.25rem` |
| `--instui-component-text-input-font-size-md` | `<length>` | `1rem` |
| `--instui-component-text-input-font-size-sm` | `<length>` | `0.875rem` |
| `--instui-component-text-input-font-weight` | `<integer>` | `500` |
| `--instui-component-text-input-height-lg` | `<length>` | `3rem` |
| `--instui-component-text-input-height-md` | `<length>` | `2.5rem` |
| `--instui-component-text-input-height-sm` | `<length>` | `2rem` |
| `--instui-component-text-input-padding-horizontal-lg` | `<length>` | `0.75rem` |
| `--instui-component-text-input-padding-horizontal-md` | `<length>` | `0.75rem` |
| `--instui-component-text-input-padding-horizontal-sm` | `<length>` | `0.5rem` |
| `--instui-component-text-input-placeholder-color` | `<color>` | `light-dark(#5F6E7A, #7E8792)` |
| `--instui-component-text-input-placeholder-hover-color` | `<color>` | `light-dark(#334450, #9EA6AD)` |
| `--instui-component-text-input-success-border-color` | `<color>` | `light-dark(#037D37, #3EA75B)` |
| `--instui-component-text-input-text-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-component-text-input-text-disabled-color` | `<color>` | `light-dark(#8D959F, #9EA6AD)` |
| `--instui-component-text-input-text-readonly-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-focus-outline-color-danger` | `auto \| <color>` | — |
| `--instui-focus-outline-color-success` | `auto \| <color>` | — |

## Gaolmhar

- [text-area](/ga/api/css/text-area.md) — The multi-line counterpart with the same states and sizes.
- [number-input](/ga/api/css/number-input.md) — The numeric-entry input sharing this chrome.
- [simple-select](/ga/api/css/simple-select.md) — The native select sharing this field chrome.
- [input-group](/ga/api/css/input-group.md) — Wraps this input with leading and trailing slots.

