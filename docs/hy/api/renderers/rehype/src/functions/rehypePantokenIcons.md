[pantoken](../../../../index.md) / [renderers/rehype/src](../index.md) / rehypePantokenIcons

# Function: rehypePantokenIcons()

> **rehypePantokenIcons**(`options?`): (`tree`) => `void`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Rehype plugin ֆաբրիկա։ Վերադարձնում է transformer, որը վերաշարադրում է `:code:` մեջբերում-ներ ներգծային SVG-ի։

## Parameters

### options?

[`RehypeOptions`](../interfaces/RehypeOptions.md) = `{}`

[RehypeOptions](../interfaces/RehypeOptions.md).

## Returns

Միավորված/rehype transformer։

(`tree`) => `void`

## Examples

**Ներկառուցված պատկերակ հավաքածու**

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

**Կազմել բրենդ-պատկերի plugin-ի լուծիչ**

```ts
import { rehypePantokenIcons } from "@pantoken/rehype";
import { simpleIcons } from "@pantoken/plugin-simple-icons";
import * as registry from "simple-icons";

unified().use(rehypePantokenIcons, { plugins: [simpleIcons({ registry })] });
// :github: now resolves from simple-icons; unknown codes stay literal text.
```
