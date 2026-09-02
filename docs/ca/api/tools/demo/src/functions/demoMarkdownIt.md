[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / demoMarkdownIt

# Funció: demoMarkdownIt()

> **demoMarkdownIt**(`md`, `options?`): `void`

Un connector markdown-it: transforma les tanques `demo` al panell de demostració. Úsa'l amb
`md.use(demoMarkdownIt, options)`.

## Paràmetres

### md

`MarkdownItLike`

La instància de markdown-it.

### options?

[`DemoMarkdownItOptions`](../interfaces/DemoMarkdownItOptions.md) = `{}`

[DemoMarkdownItOptions](../interfaces/DemoMarkdownItOptions.md).

## Retorna

`void`

## Exemple

```ts
import MarkdownIt from "markdown-it";
import { demoMarkdownIt } from "@pantoken/demo";

const md = new MarkdownIt().use(demoMarkdownIt, {
  base: "/pantoken/",
  cssUrls: ["/pantoken/demos-assets/tokens.css", "/pantoken/demos-assets/components.css"],
});
```
