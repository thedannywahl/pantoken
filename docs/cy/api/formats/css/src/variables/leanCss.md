[pantoken](../../../../index.md) / [formats/css/src](../index.md) / leanCss

# Newidyn: leanCss

> `const` **leanCss**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

The lean `rebrand` stylesheet string — the full sheet minus the `--instui-icon-*` glyph tokens (the
~1,777 icon data-URIs that make up most of [css](css.md)). Roughly a sixth the size over the wire; the
recommended foundation for CDN/embed delivery. Components reference only a handful of icons, shipped
separately as `@pantoken/components`'s `component-icons.css`; consumers who use `var(--instui-icon-*)`
broadly should load the full [css](css.md) (or the `icons.css` glyph sheet). See
`@pantoken/css/style.lean.css`.

## Enghraifft

```ts
import { leanCss } from "@pantoken/css";
```
