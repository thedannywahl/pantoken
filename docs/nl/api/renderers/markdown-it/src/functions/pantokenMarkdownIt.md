[pantoken](../../../../index.md) / [renderers/markdown-it/src](../index.md) / pantokenMarkdownIt

# Function: pantokenMarkdownIt()

> **pantokenMarkdownIt**(`md`, `options?`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

A markdown-it plugin factory. Use it with `md.use(pantokenMarkdownIt, options)`.

## Parameters

### md

`MarkdownIt`

The markdown-it instance.

### options?

[`MarkdownItOptions`](../interfaces/MarkdownItOptions.md) = `{}`

[MarkdownItOptions](../interfaces/MarkdownItOptions.md).

## Returns

`void`

## Example

**Compose a brand-icon plugin's resolver**

```ts
import MarkdownIt from "markdown-it";
import { pantokenMarkdownIt } from "@pantoken/markdown-it";
import { simpleIcons } from "@pantoken/plugin-simple-icons";

const md = new MarkdownIt().use(pantokenMarkdownIt, { plugins: [simpleIcons()] });
```
