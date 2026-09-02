[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / demoMarkdownIt

# Fonksiyon: demoMarkdownIt()

> **demoMarkdownIt**(`md`, `options?`): `void`

A markdown-it plugin: turn `demo` fences into the demo panel. Use it with
`md.use(demoMarkdownIt, options)`.

## Parametreler

### md

`MarkdownItLike`

The markdown-it instance.

### options?

[`DemoMarkdownItOptions`](../interfaces/DemoMarkdownItOptions.md) = `{}`

[DemoMarkdownItOptions](../interfaces/DemoMarkdownItOptions.md).

## Döndürür

`void`

## Örnek

```ts
import MarkdownIt from "markdown-it";
import { demoMarkdownIt } from "@pantoken/demo";

const md = new MarkdownIt().use(demoMarkdownIt, {
  base: "/pantoken/",
  cssUrls: ["/pantoken/demos-assets/tokens.css", "/pantoken/demos-assets/components.css"],
});
```
