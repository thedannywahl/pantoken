[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / demoMarkdownIt

# Function: demoMarkdownIt()

> **demoMarkdownIt**(`md`, `options?`): `void`

Markdown-it պլագին: փոխել `demo` պատերը դեմո վահանակի: Օգտագործել այն
`md.use(demoMarkdownIt, options)` հետ:

## Parameters

### md

`MarkdownItLike`

Markdown-it օրինակ:

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
