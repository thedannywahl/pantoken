# CSS: modal.footer

`.footer` — The actions row (InstUI `Modal.Footer`).

The parent `modal`'s `-density-compact` and `-color-inverse` modifiers restyle this member — see `modal`'s own doc for those modifiers.

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/modal.footer.css";
```

## Tokens consumed

| Token                                                      | Type       | Value                          |
| ---------------------------------------------------------- | ---------- | ------------------------------ |
| `--instui-component-modal-footer-background-color`         | `<color>`  | `light-dark(#ffffff, #171B21)` |
| `--instui-component-modal-footer-border-color`             | `<color>`  | `light-dark(#E8EAEC, #334450)` |
| `--instui-component-modal-footer-border-radius`            | `<length>` | `1rem`                         |
| `--instui-component-modal-footer-border-width`             | `<length>` | `0.0625rem`                    |
| `--instui-component-modal-footer-inverse-background-color` | `<color>`  | `light-dark(#273540, #1C222B)` |
| `--instui-component-modal-footer-inverse-border-color`     | `<color>`  | `#334450`                      |
| `--instui-component-modal-footer-padding`                  | `<length>` | `1.5rem`                       |
| `--instui-component-modal-footer-padding-compact`          | `<length>` | `0.75rem`                      |
