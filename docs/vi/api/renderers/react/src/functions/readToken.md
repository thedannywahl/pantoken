[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / readToken

# Hàm: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Thử nghiệm</span>

Read a resolved token value from the document. Returns `fallback` on the server.

## Tham số

### name

`string`

### fallback?

`string` = `""`

## Trả về

`string`

## Ví dụ

```tsx
import { readToken } from "@pantoken/react";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
