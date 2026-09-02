[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / buildIconResolver

# ฟังก์ชัน: buildIconResolver()

> **buildIconResolver**(`options?`): [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

Build the icon-resolver chain: plugin `rehype` resolvers first, then explicit `resolvers`, then
the built-in `@pantoken/icons` set. The first match wins.

## พารามิเตอร์

### options?

[`InstuiMarkdownRenderOptions`](../interfaces/InstuiMarkdownRenderOptions.md)

## คืนค่า

[`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

## ตัวอย่าง

```ts
import { buildIconResolver } from "@pantoken/react-markdown";

const resolve = buildIconResolver();
resolve("arrow-left"); // an IconEntry from the built-in set, or undefined
```
