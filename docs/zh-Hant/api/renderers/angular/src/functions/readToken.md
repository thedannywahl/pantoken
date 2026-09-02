[pantoken](../../../../index.md) / [renderers/angular/src](../index.md) / readToken

# 函式: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">實驗性</span>

Read a resolved token value. Returns `fallback` on the server.

## 參數

### name

`string`

### fallback?

`string` = `""`

## 回傳

`string`

## 範例

```ts
import { readToken } from "@pantoken/angular";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
