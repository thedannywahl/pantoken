[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / avatar

# Variable: avatar

> `const` **avatar**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`<instui-avatar>` — a circular (or rectangular) avatar. `variant` maps to `-color-<variant>`,
`size` to `-size-<size>`, and `shape="rectangle"` to `-shape-rectangle`; slotted content is the
initials, or an `<img>` (use an absolute/CDN `src`) to show a photo.

## Example

```html
<instui-avatar size="lg" margin="small">JS</instui-avatar>
<instui-avatar shape="rectangle" variant="green" margin="small">AB</instui-avatar>
```
