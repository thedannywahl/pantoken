# CSS: radio-input-group

`.instui-radio-input-group` — En enkel-vælg radio `&lt;fieldset&gt;`, enkelt eller som en forbundet segmenteret skifter.

Indstiller sin egen `gap` mellem radios; kæde en `-gap-*` afstandsuduld modifier tilsidesætter den indbyggede værdi.

**Kilde:** [radio-input-group.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/radio-input-group/radio-input-group.css)

## Accessibility

Gengiver en native `&lt;fieldset&gt;` med en `&lt;legend&gt;` som navngiver gruppen; de underordnede radios deler en `name`, så kun en kan vælges på en gang.

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/radio-input-group.css";
```

## Examples

```html
<fieldset class="instui-radio-input-group">
  <legend>T-shirt size</legend>
  <label class="instui-radio"><input type="radio" name="size" checked /> Small</label>
  <label class="instui-radio"><input type="radio" name="size" /> Medium</label>
  <label class="instui-radio"><input type="radio" name="size" /> Large</label>
</fieldset>
```

### Toggle variant

```html
<fieldset class="instui-radio-input-group -variant-toggle">
  <legend>T-shirt size</legend>
  <label class="instui-radio -variant-toggle"
    ><input type="radio" name="size" checked /> Small</label
  >
  <label class="instui-radio -variant-toggle"><input type="radio" name="size" /> Medium</label>
  <label class="instui-radio -variant-toggle"><input type="radio" name="size" /> Large</label>
</fieldset>
```

## Structure

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

## Modifiers

| Modifier           | Description                                                                                          |
| ------------------ | ---------------------------------------------------------------------------------------------------- |
| `.-layout-columns` | Læg radioerne ud i kolonner.                                                                         |
| `.-layout-inline`  | Læg radioerne ud inline.                                                                             |
| `.-required`       | Markér gruppen som påkrævet.                                                                         |
| `.-variant-toggle` | Læg de underordnede skiftere ud som en segmenteret kontrolenheder (kun det valgte segment udfyldes). |

## Pseudo-elements

| Pseudo-element | Description                                                                                   |
| -------------- | --------------------------------------------------------------------------------------------- |
| `::after`      | Gengiver den dekorative påkrævet-felt asterisk efter legendeteksten, når gruppen er påkrævet. |

## Tokens consumed

| Token                                                 | Type                                               | Value                                                                        |
| ----------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------- |
| `--instui-component-form-field-layout-asterisk-color` | `<color>`                                          | `light-dark(#CF1F24, #FA917F)`                                               |
| `--instui-component-form-field-layout-font-family`    | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-form-field-layout-font-size`      | `<length>`                                         | `1rem`                                                                       |
| `--instui-component-form-field-layout-font-weight`    | `<integer>`                                        | `400`                                                                        |
| `--instui-component-form-field-layout-gap-inputs`     | `<length>`                                         | `0.75rem`                                                                    |
| `--instui-component-form-field-layout-gap-primitives` | `<length>`                                         | `0.5rem`                                                                     |
| `--instui-component-form-field-layout-line-height`    | `<length>`                                         | `1.125rem`                                                                   |
| `--instui-component-form-field-layout-text-color`     | `<color>`                                          | `light-dark(#273540, #ffffff)`                                               |
| `--instui-spacing-space-md`                           | `<length>`                                         | `0.75rem`                                                                    |

## Subcomponents

- [radio](/da/api/css/radio.md)

## Related

- [radio](/da/api/css/radio.md) — Det enkelte kontrolelement, som denne gruppe indsamler.
- [form-field-group](/da/api/css/form-field-group.md) — Den generelle wrapper til gruppering og layout af felter.
