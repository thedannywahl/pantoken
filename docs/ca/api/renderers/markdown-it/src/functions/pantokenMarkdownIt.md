[pantoken](../../../../index.md) / [renderers/markdown-it/src](../index.md) / pantokenMarkdownIt

# Function: pantokenMarkdownIt()

> **pantokenMarkdownIt**(`md`, `options?`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Una fàbrica de connectors markdown-it. Utilitza-la amb `md.use(pantokenMarkdownIt, options)`.

## Parameters

### md

`MarkdownIt`

La instància de markdown-it.

### options?

[`MarkdownItOptions`](../interfaces/MarkdownItOptions.md) = `{}`

[MarkdownItOptions](../interfaces/MarkdownItOptions.md).

## Returns

`void`

## Example

**Compon el resolvedor d'un connector de marca-icona**

```ts
import MarkdownIt from "markdown-it";
import { pantokenMarkdownIt } from "@pantoken/markdown-it";
import { simpleIcons } from "@pantoken/plugin-simple-icons";

const md = new MarkdownIt().use(pantokenMarkdownIt, { plugins: [simpleIcons()] });
```
