[pantoken](../../../../index.md) / [renderers/angular/src](../index.md) / readToken

# 함수: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">실험적</span>

Read a resolved token value. Returns `fallback` on the server.

## 매개변수

### name

`string`

### fallback?

`string` = `""`

## 반환값

`string`

## 예제

```ts
import { readToken } from "@pantoken/angular";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
