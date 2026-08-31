# CSS: modal.body

`.body` — La regió de contingut (InstUI `Modal.Body`); un `&lt;img&gt;` solitari va a tot el sagnat.

Els modificadors `-overflow-fit`, `-density-compact` i `-color-inverse` del pare `modal` restilen aquest membre — consulteu la doc pròpia de `modal` per a aquests modificadors.

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/modal.body.css";
```

## Tokens consumed

| Token                                                    | Type       | Value                          |
| -------------------------------------------------------- | ---------- | ------------------------------ |
| `--instui-component-modal-body-inverse-background-color` | `<color>`  | `light-dark(#273540, #1C222B)` |
| `--instui-component-modal-body-padding`                  | `<length>` | `1.5rem`                       |
| `--instui-component-modal-body-padding-compact`          | `<length>` | `0.75rem`                      |
