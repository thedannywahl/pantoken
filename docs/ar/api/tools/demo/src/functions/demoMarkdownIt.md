[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / demoMarkdownIt

# Function: demoMarkdownIt()

> **demoMarkdownIt**(`md`, `options?`): `void`

مكون إضافي markdown-it: تحويل سياجات `demo` إلى لوحة العرض التوضيحي. استخدمه مع
`md.use(demoMarkdownIt, options)`.

## Parameters

### md

`MarkdownItLike`

مثيل markdown-it.

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
