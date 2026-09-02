[pantoken](../../../../index.md) / [renderers/angular/src](../index.md) / readToken

# 関数: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">実験的</span>

Read a resolved token value. Returns `fallback` on the server.

## パラメーター

### name

`string`

### fallback?

`string` = `""`

## 戻り値

`string`

## 例

```ts
import { readToken } from "@pantoken/angular";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
