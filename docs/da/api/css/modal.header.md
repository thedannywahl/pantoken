# CSS: modal.header

`.header` — Tittelrækken (InstUI `Modal.Header`).

Den overordnede `modal`'s `-density-compact` og `-color-inverse` modifikatorer redesigner dette medlem — se `modal`'s egen dokumentation for disse modifikatorer.

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/modal.header.css";
```

## Tokens consumed

| Token                                                      | Type       | Value                          |
| ---------------------------------------------------------- | ---------- | ------------------------------ |
| `--instui-component-modal-header-background-color`         | `<color>`  | `light-dark(#ffffff, #171B21)` |
| `--instui-component-modal-header-border-color`             | `<color>`  | `light-dark(#E8EAEC, #334450)` |
| `--instui-component-modal-header-border-width`             | `<length>` | `0.0625rem`                    |
| `--instui-component-modal-header-inverse-background-color` | `<color>`  | `light-dark(#273540, #1C222B)` |
| `--instui-component-modal-header-inverse-border-color`     | `<color>`  | `#334450`                      |
| `--instui-component-modal-header-padding`                  | `<length>` | `1.5rem`                       |
| `--instui-component-modal-header-padding-compact`          | `<length>` | `0.75rem`                      |
