# CSS: radio-input-group

`.instui-radio-input-group` — A single-select radio `&lt;fieldset&gt;`, plain or as a connected segmented toggle.

Sets its own `gap` between radios; chaining a `-gap-*` spacing utility modifier overrides that built-in value.

**Source:** [radio-input-group.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/radio-input-group/radio-input-group.css)

## Dostępność

Renders a native `&lt;fieldset&gt;` with a `&lt;legend&gt;` that names the group; the child radios share one `name`, so only one can be selected at a time.

## Użycie

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/radio-input-group.css";
```

## Przykłady

```html
<fieldset class="instui-radio-input-group">
  <legend>T-shirt size</legend>
  <label class="instui-radio"><input type="radio" name="size" checked> Small</label>
  <label class="instui-radio"><input type="radio" name="size"> Medium</label>
  <label class="instui-radio"><input type="radio" name="size"> Large</label>
</fieldset>
```
### Toggle variant
```html
<fieldset class="instui-radio-input-group -variant-toggle">
  <legend>T-shirt size</legend>
  <label class="instui-radio -variant-toggle"><input type="radio" name="size" checked> Small</label>
  <label class="instui-radio -variant-toggle"><input type="radio" name="size"> Medium</label>
  <label class="instui-radio -variant-toggle"><input type="radio" name="size"> Large</label>
</fieldset>
```

## Struktura

```text
.instui-radio-input-group.-variant-toggle
  legend
  radio (component)
    input
```

```mermaid
flowchart TD
  n0[".instui-radio-input-group.-variant-toggle"]:::cssdoc-root
  n1("legend"):::cssdoc-part
  n2(["radio"]):::cssdoc-component
  n3("input"):::cssdoc-part
  n0 --> n1
  n2 --> n3
  n0 --> n2
  click n2 "/api/css/radio.md"
  classDef cssdoc-root fill:#eef2ff,stroke:#6366f1,color:#1e1b4b;
  classDef cssdoc-part fill:#f8fafc,stroke:#94a3b8,color:#0f172a;
  classDef cssdoc-slot fill:#f0fdf4,stroke:#4ade80,color:#14532d;
  classDef cssdoc-component fill:#fff7ed,stroke:#fb923c,color:#7c2d12;
```

## Modyfikatory

| Modyfikator | Opis |
| --- | --- |
| `.-layout-columns` | Lay the radios out in columns. |
| `.-layout-inline` | Lay the radios out inline. |
| `.-required` | Mark the group as required. |
| `.-variant-toggle` | Lay the child toggles out as a segmented control (only the selected segment fills). |

## Pseudo-elementy

| Pseudo-element | Opis |
| --- | --- |
| `::after` | Renders the decorative required-field asterisk after the legend text when the group is required. |

## Zużyte tokeny

| Token | Typ | Wartość |
| --- | --- | --- |
| `--instui-component-form-field-layout-asterisk-color` | `<color>` | `light-dark(#CF1F24, #FA917F)` |
| `--instui-component-form-field-layout-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-form-field-layout-font-size` | `<length>` | `1rem` |
| `--instui-component-form-field-layout-font-weight` | `<integer>` | `400` |
| `--instui-component-form-field-layout-gap-inputs` | `<length>` | `0.75rem` |
| `--instui-component-form-field-layout-gap-primitives` | `<length>` | `0.5rem` |
| `--instui-component-form-field-layout-line-height` | `<length>` | `1.125rem` |
| `--instui-component-form-field-layout-text-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-spacing-space-md` | `<length>` | `0.75rem` |

## Subkomponenty

- [radio](/pl/api/css/radio.md)

## Powiązane

- [radio](/pl/api/css/radio.md) — The individual control this group collects.
- [form-field-group](/pl/api/css/form-field-group.md) — The general wrapper for grouping and laying out fields.

