[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / readToken

# تابع: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجربی</span>

Read a resolved token value. Returns `fallback` on the server.

## پارامترها

### name

`string`

### fallback?

`string` = `""`

## مقدار بازگشتی

`string`

## نمونه

```ts
import { readToken } from "@pantoken/svelte";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
