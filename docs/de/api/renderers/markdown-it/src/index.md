[pantoken](../../../index.md) / markdown-it

# markdown-it

<span class="instui-pill -color-danger pantoken-doc-tag">Experimentell</span>

`@pantoken/markdown-it` — a markdown-it plugin that renders `:icon:` codes as inline SVG and
standalone color values (`#03893D`, `rgb(…)`, `oklch(…)`) as swatches, using the pantoken icon
set.

It ports the `@pantoken/rehype` and `@pantoken/react-markdown` pipelines onto markdown-it: a
single core rule walks each inline token's text children, splits them on the icon and color
patterns, and swaps the matches for `html_inline` tokens. Icon codes resolve through a chain —
plugin `rehype` resolvers first, then an explicit [MarkdownItOptions.resolve](interfaces/MarkdownItOptions.md#resolve), then the
built-in `@pantoken/icons` set — so brand-icon plugins compose the same way they do elsewhere.

The emitted markup uses the same class names as the other renderers (`pantoken-icon`,
`pantoken-color-swatch`), so loading `@pantoken/components` styles it. Wrap the rendered HTML in a
`.pantoken-prose` container (see [PROSE\_CLASS](variables/PROSE_CLASS.md)) to pick up the prose layer too.

## Beispiel

```ts
import MarkdownIt from "markdown-it";
import { pantokenMarkdownIt } from "@pantoken/markdown-it";

const md = new MarkdownIt().use(pantokenMarkdownIt);
md.render("Save :check: to lock in #03893D.");
```

## Schnittstellen

- [MarkdownItOptions](interfaces/MarkdownItOptions.md)

## Variablen

- [PROSE\_CLASS](variables/PROSE_CLASS.md)

## Funktionen

- [pantokenMarkdownIt](functions/pantokenMarkdownIt.md)

## Referenzen

### default

Renames and re-exports [pantokenMarkdownIt](functions/pantokenMarkdownIt.md)
