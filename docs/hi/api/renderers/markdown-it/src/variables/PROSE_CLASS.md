[pantoken](../../../../index.md) / [renderers/markdown-it/src](../index.md) / PROSE\_CLASS

# वैरिएबल: PROSE\_CLASS

> `const` **PROSE\_CLASS**: `"pantoken-prose"` = `"pantoken-prose"`

<span class="instui-pill -color-danger pantoken-doc-tag">प्रयोगात्मक</span>

The prose-scope class the emitted markup is designed to sit inside.

## उदाहरण

```ts
import MarkdownIt from "markdown-it";
import { pantokenMarkdownIt, PROSE_CLASS } from "@pantoken/markdown-it";

const md = new MarkdownIt().use(pantokenMarkdownIt);
const html = `<div class="${PROSE_CLASS}">${md.render("Save :check:")}</div>`;
```
