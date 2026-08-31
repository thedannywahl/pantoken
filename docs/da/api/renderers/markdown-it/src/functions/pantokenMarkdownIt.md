[pantoken](../../../../index.md) / [renderers/markdown-it/src](../index.md) / pantokenMarkdownIt

# Function: pantokenMarkdownIt()

> **pantokenMarkdownIt**(`md`, `options?`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

En markdown-it plugin-fabrik. Brug det med `md.use(pantokenMarkdownIt, options)`.

## Parameters

### md

`MarkdownIt`

markdown-it-instansen.

### options?

[`MarkdownItOptions`](../interfaces/MarkdownItOptions.md) = `{}`

[MarkdownItOptions](../interfaces/MarkdownItOptions.md).

## Returns

`void`

## Example

**Sammensæt en brand-icon plugins resolver**

```ts
import MarkdownIt from "markdown-it";
import { pantokenMarkdownIt } from "@pantoken/markdown-it";
import { simpleIcons } from "@pantoken/plugin-simple-icons";

const md = new MarkdownIt().use(pantokenMarkdownIt, { plugins: [simpleIcons()] });
```
