# CSS: modal.body

`.body` — The content region (InstUI `Modal.Body`); a lone `&lt;img&gt;` goes full-bleed.

The parent `modal`'s `-overflow-fit`, `-density-compact`, and `-color-inverse` modifiers restyle this member — see `modal`'s own doc for those modifiers.

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/modal.body.css";
```

## Tokens consumed

| Token | Type | Value |
| --- | --- | --- |
| `--instui-component-modal-body-inverse-background-color` | `<color>` | `light-dark(#273540, #1C222B)` |
| `--instui-component-modal-body-padding` | `<length>` | `1.5rem` |
| `--instui-component-modal-body-padding-compact` | `<length>` | `0.75rem` |

