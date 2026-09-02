[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / demoMarkdownIt

# Fungsi: demoMarkdownIt()

> **demoMarkdownIt**(`md`, `options?`): `void`

A markdown-it plugin: turn `demo` fences into the demo panel. Use it with
`md.use(demoMarkdownIt, options)`.

## Parameter

### md

`MarkdownItLike`

The markdown-it instance.

### options?

[`DemoMarkdownItOptions`](../interfaces/DemoMarkdownItOptions.md) = `{}`

[DemoMarkdownItOptions](../interfaces/DemoMarkdownItOptions.md).

## Mengembalikan

`void`

## Contoh

```ts
import MarkdownIt from "markdown-it";
import { demoMarkdownIt } from "@pantoken/demo";

const md = new MarkdownIt().use(demoMarkdownIt, {
  base: "/pantoken/",
  cssUrls: ["/pantoken/demos-assets/tokens.css", "/pantoken/demos-assets/components.css"],
});
```
