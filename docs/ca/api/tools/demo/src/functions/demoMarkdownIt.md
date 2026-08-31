[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / demoMarkdownIt

# Function: demoMarkdownIt()

> **demoMarkdownIt**(`md`, `options?`): `void`

Un connector markdown-it: transforma les tanques `demo` al panell de demostració. Úsa'l amb
`md.use(demoMarkdownIt, options)`.

## Parameters

### md

`MarkdownItLike`

La instància de markdown-it.

### options?

[`DemoMarkdownItOptions`](../interfaces/DemoMarkdownItOptions.md) = `{}`

[DemoMarkdownItOptions](../interfaces/DemoMarkdownItOptions.md).

## Returns

`void`

## Example

```ts
import MarkdownIt from "markdown-it";
import { demoMarkdownIt } from "@pantoken/demo";

const md = new MarkdownIt().use(demoMarkdownIt, {
  base: "/pantoken/",
  cssUrls: ["/pantoken/demos-assets/tokens.css", "/pantoken/demos-assets/components.css"],
});
```
