[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / readToken

# 函数: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">实验性</span>

Read a resolved token value from the document. Returns `fallback` on the server.

## 参数

### name

`string`

### fallback?

`string` = `""`

## 返回值

`string`

## 示例

```tsx
import { readToken } from "@pantoken/react";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
