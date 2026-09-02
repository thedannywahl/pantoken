[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / demoMarkdownIt

# फंक्शन: demoMarkdownIt()

> **demoMarkdownIt**(`md`, `options?`): `void`

A markdown-it plugin: turn `demo` fences into the demo panel. Use it with
`md.use(demoMarkdownIt, options)`.

## पैरामीटर

### md

`MarkdownItLike`

The markdown-it instance.

### options?

[`DemoMarkdownItOptions`](../interfaces/DemoMarkdownItOptions.md) = `{}`

[DemoMarkdownItOptions](../interfaces/DemoMarkdownItOptions.md).

## वापसी

`void`

## उदाहरण

```ts
import MarkdownIt from "markdown-it";
import { demoMarkdownIt } from "@pantoken/demo";

const md = new MarkdownIt().use(demoMarkdownIt, {
  base: "/pantoken/",
  cssUrls: ["/pantoken/demos-assets/tokens.css", "/pantoken/demos-assets/components.css"],
});
```
