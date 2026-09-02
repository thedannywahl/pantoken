[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / buildIconResolver

# تابع: buildIconResolver()

> **buildIconResolver**(`options?`): [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

Build the icon-resolver chain: plugin `rehype` resolvers first, then explicit `resolvers`, then
the built-in `@pantoken/icons` set. The first match wins.

## پارامترها

### options?

[`InstuiMarkdownRenderOptions`](../interfaces/InstuiMarkdownRenderOptions.md)

## مقدار بازگشتی

[`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

## نمونه

```ts
import { buildIconResolver } from "@pantoken/react-markdown";

const resolve = buildIconResolver();
resolve("arrow-left"); // an IconEntry from the built-in set, or undefined
```
