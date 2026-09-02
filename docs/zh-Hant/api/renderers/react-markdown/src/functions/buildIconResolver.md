[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / buildIconResolver

# 函式: buildIconResolver()

> **buildIconResolver**(`options?`): [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

Build the icon-resolver chain: plugin `rehype` resolvers first, then explicit `resolvers`, then
the built-in `@pantoken/icons` set. The first match wins.

## 參數

### options?

[`InstuiMarkdownRenderOptions`](../interfaces/InstuiMarkdownRenderOptions.md)

## 回傳

[`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

## 範例

```ts
import { buildIconResolver } from "@pantoken/react-markdown";

const resolve = buildIconResolver();
resolve("arrow-left"); // an IconEntry from the built-in set, or undefined
```
