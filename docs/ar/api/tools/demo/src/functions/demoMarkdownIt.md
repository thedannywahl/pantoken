[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / demoMarkdownIt

# دالة: demoMarkdownIt()

> **demoMarkdownIt**(`md`, `options?`): `void`

ملحق لـ markdown-it: حول الحواجز `demo` إلى لوحة العرض التوضيحية. استخدمه مع
`md.use(demoMarkdownIt, options)`.

## المعلمات

### md

`MarkdownItLike`

مثيل markdown-it.

### options?

[`DemoMarkdownItOptions`](../interfaces/DemoMarkdownItOptions.md) = `{}`

[DemoMarkdownItOptions](../interfaces/DemoMarkdownItOptions.md).

## القيم المرجعة

`void`

## مثال

```ts
import MarkdownIt from "markdown-it";
import { demoMarkdownIt } from "@pantoken/demo";

const md = new MarkdownIt().use(demoMarkdownIt, {
  base: "/pantoken/",
  cssUrls: ["/pantoken/demos-assets/tokens.css", "/pantoken/demos-assets/components.css"],
});
```
