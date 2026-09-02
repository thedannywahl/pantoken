# CSS: radio

`.instui-radio` — A native radio button and its label.

Sets its own `gap` between the control and its label; chaining a `-gap-*` spacing utility modifier overrides that built-in value.

**Source:** [radio.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/radio/radio.css)

## Aksesibilitas

A native `<input type="radio">` drives `:checked` and `:disabled`; `-readonly` is styling only, since radios have no native readonly attribute.

## Penggunaan

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/radio.css";
```

## Contoh

```html
<label class="instui-radio"><input type="radio" name="r" checked> Option A</label>
```

## Modifikator

| Modifikator | Deskripsi |
| --- | --- |
| `.-context-danger` | Danger context colour (toggle variant). |
| `.-context-off` | Off/neutral context colour (toggle variant). |
| `.-context-success` | Success context colour (toggle variant). |
| `.-context-warning` | Warning context colour (toggle variant). |
| `.-readonly` | Read-only state. |
| `.-size-large` | Large. Long-form alias of `-size-lg`. |
| `.-size-lg` | Large. |
| `.-size-sm` | Small. |
| `.-size-small` | Small. Long-form alias of `-size-sm`. |
| `.-toggle` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-variant-toggle`. |
| `.-variant-toggle` | Render as a segmented toggle button. |

## Pseudo-elemen

| Pseudo-elemen | Deskripsi |
| --- | --- |
| `::before` | The filled inner dot shown when checked; on `-variant-toggle` it is the focus ring drawn just outside the pill. |

## Status

| Status | Deskripsi |
| --- | --- |
| `:checked` | — |
| `:disabled` | — |

## Properti khusus

| Properti | Tipe | Bawaan | Deskripsi |
| --- | --- | --- | --- |
| `--pantoken-rt-fill` | `<color>` | — | The toggle's selected fill colour; the -context-* modifiers set it. |

## Token yang digunakan

| Token | Tipe | Nilai |
| --- | --- | --- |
| `--instui-component-radio-input-background-color` | `<color>` | `light-dark(#ffffff, #171B21)` |
| `--instui-component-radio-input-background-disabled-color` | `<color>` | `light-dark(#E8EAEC, #334450)` |
| `--instui-component-radio-input-background-hover-color` | `<color>` | `light-dark(#ffffff, #171B21)` |
| `--instui-component-radio-input-background-readonly-color` | `<color>` | `light-dark(#C7CACD, #6A7883)` |
| `--instui-component-radio-input-border-color` | `<color>` | `light-dark(#7E8792, #5F6E7A)` |
| `--instui-component-radio-input-border-disabled-color` | `<color>` | `light-dark(#C7CACD, #4A5B68)` |
| `--instui-component-radio-input-border-hover-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-component-radio-input-border-readonly-color` | `<color>` | `#8D959F` |
| `--instui-component-radio-input-border-selected-color` | `<color>` | `light-dark(#1C222B, #ffffff)` |
| `--instui-component-radio-input-border-width` | `<length>` | `0.0625rem` |
| `--instui-component-radio-input-checked-inset-lg` | `<length>` | `0.375rem` |
| `--instui-component-radio-input-checked-inset-md` | `<length>` | `0.375rem` |
| `--instui-component-radio-input-checked-inset-sm` | `<length>` | `0.375rem` |
| `--instui-component-radio-input-control-size-lg` | `<length>` | `1.5rem` |
| `--instui-component-radio-input-control-size-md` | `<length>` | `1.5rem` |
| `--instui-component-radio-input-control-size-sm` | `<length>` | `1.5rem` |
| `--instui-component-radio-input-control-vertical-margin` | `<length>` | `0rem` |
| `--instui-component-radio-input-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-radio-input-font-size-lg` | `<length>` | `1.25rem` |
| `--instui-component-radio-input-font-size-md` | `<length>` | `1rem` |
| `--instui-component-radio-input-font-size-sm` | `<length>` | `0.875rem` |
| `--instui-component-radio-input-font-weight` | `<integer>` | `400` |
| `--instui-component-radio-input-gap` | `<length>` | `0.5rem` |
| `--instui-component-radio-input-label-base-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-component-radio-input-label-disabled-color` | `<color>` | `light-dark(#8D959F, #576773)` |
| `--instui-component-radio-input-label-hover-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-component-radio-input-label-readonly-color` | `<color>` | `light-dark(#273540, #F2F4F5)` |
| `--instui-component-radio-input-line-height-lg` | `<length>` | `1.5rem` |
| `--instui-component-radio-input-line-height-md` | `<length>` | `1.5rem` |
| `--instui-component-radio-input-line-height-sm` | `<length>` | `1.25rem` |
| `--instui-component-radio-input-toggle-background-danger` | `<color>` | `#CF4A00` |
| `--instui-component-radio-input-toggle-background-off` | `<color>` | `#03893D` |
| `--instui-component-radio-input-toggle-background-success` | `<color>` | `#03893D` |
| `--instui-component-radio-input-toggle-background-warning` | `<color>` | `#CF4A00` |
| `--instui-component-radio-input-toggle-border-radius` | `<length>` | `0.25rem` |
| `--instui-component-radio-input-toggle-handle-text` | `<color>` | `#ffffff` |
| `--instui-component-radio-input-toggle-large-font-size` | `<length>` | `1rem` |
| `--instui-component-radio-input-toggle-large-height` | `<length>` | `3rem` |
| `--instui-component-radio-input-toggle-medium-font-size` | `<length>` | `0.875rem` |
| `--instui-component-radio-input-toggle-medium-height` | `<length>` | `2.5rem` |
| `--instui-component-radio-input-toggle-small-font-size` | `<length>` | `0.75rem` |
| `--instui-component-radio-input-toggle-small-height` | `<length>` | `2rem` |
| `--instui-elevation-depth1` | `none \| <shadow>#` | — |
| `--instui-focus-outline-color` | `auto \| <color>` | — |
| `--instui-focus-outline-style` | `auto \| <outline-line-style>` | — |
| `--instui-focus-outline-width` | `<line-width>` | — |

## Terkait

- [checkbox](/id/api/css/checkbox.md) — The multi-select counterpart to a single-select radio.
- [radio-input-group](/id/api/css/radio-input-group.md) — Collects radios into one single-select fieldset.

