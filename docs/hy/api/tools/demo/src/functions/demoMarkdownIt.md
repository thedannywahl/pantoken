[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / demoMarkdownIt

# Ֆունկցիա: demoMarkdownIt()

> **demoMarkdownIt**(`md`, `options?`): `void`

Markdown-it պլագին: փոխել `demo` պատերը դեմո վահանակի: Օգտագործել այն
`md.use(demoMarkdownIt, options)` հետ:

## Պարամետրեր

### md

`MarkdownItLike`

Markdown-it օրինակ:

### options?

[`DemoMarkdownItOptions`](../interfaces/DemoMarkdownItOptions.md) = `{}`

[DemoMarkdownItOptions](../interfaces/DemoMarkdownItOptions.md).

## Վերադարձվող արժեք

`void`

## Օրինակ

```ts
import MarkdownIt from "markdown-it";
import { demoMarkdownIt } from "@pantoken/demo";

const md = new MarkdownIt().use(demoMarkdownIt, {
  base: "/pantoken/",
  cssUrls: ["/pantoken/demos-assets/tokens.css", "/pantoken/demos-assets/components.css"],
});
```
