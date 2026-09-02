[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / readToken

# تابع: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجربی</span>

Read a resolved token value from the document. Returns `fallback` on the server.

## پارامترها

### name

`string`

### fallback?

`string` = `""`

## مقدار بازگشتی

`string`

## نمونه

```tsx
import { readToken } from "@pantoken/react";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
