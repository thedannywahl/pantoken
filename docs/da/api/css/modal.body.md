# CSS: modal.body

`.body` — Indholdsregionen (InstUI `Modal.Body`); en enlig `&lt;img&gt;` bliver fuld-bleed.

Den overordnede `modal`'s `-overflow-fit`, `-density-compact` og `-color-inverse` modifikatorer redesigner dette medlem — se `modal`'s egen dokumentation for disse modifikatorer.

## Brug

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/modal.body.css";
```

## Forbrugte tokens

| Token | Type | Værdi |
| --- | --- | --- |
| `--instui-component-modal-body-inverse-background-color` | `<color>` | `light-dark(#273540, #1C222B)` |
| `--instui-component-modal-body-padding` | `<length>` | `1.5rem` |
| `--instui-component-modal-body-padding-compact` | `<length>` | `0.75rem` |

