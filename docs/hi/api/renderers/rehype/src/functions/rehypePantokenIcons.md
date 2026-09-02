[pantoken](../../../../index.md) / [renderers/rehype/src](../index.md) / rehypePantokenIcons

# फंक्शन: rehypePantokenIcons()

> **rehypePantokenIcons**(`options?`): (`tree`) => `void`

<span class="instui-pill -color-danger pantoken-doc-tag">प्रयोगात्मक</span>

A rehype plugin factory. Returns a transformer that rewrites `:code:` tokens to inline SVG.

## पैरामीटर

### options?

[`RehypeOptions`](../interfaces/RehypeOptions.md) = `{}`

[RehypeOptions](../interfaces/RehypeOptions.md).

## वापसी

A unified/rehype transformer.

(`tree`) => `void`

## उदाहरण

**Built-in icon set**

```ts
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import { rehypePantokenIcons } from "@pantoken/rehype";

const html = await unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypePantokenIcons)
  .use(rehypeRaw) // required: the icon body is a raw SVG node
  .use(rehypeStringify)
  .process("go :arrow-left: back");
```

**Compose a brand-icon plugin's resolver**

```ts
import { rehypePantokenIcons } from "@pantoken/rehype";
import { simpleIcons } from "@pantoken/plugin-simple-icons";
import * as registry from "simple-icons";

unified().use(rehypePantokenIcons, { plugins: [simpleIcons({ registry })] });
// :github: now resolves from simple-icons; unknown codes stay literal text.
```
