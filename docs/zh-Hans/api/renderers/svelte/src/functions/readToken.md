[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / readToken

# 函数: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">实验性</span>

Read a resolved token value. Returns `fallback` on the server.

## 参数

### name

`string`

### fallback?

`string` = `""`

## 返回值

`string`

## 示例

```ts
import { readToken } from "@pantoken/svelte";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
