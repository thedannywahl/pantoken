[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / readToken

# פונקציה: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">ניסיוני</span>

Read a resolved token value from the document. Returns `fallback` on the server.

## פרמטרים

### name

`string`

### fallback?

`string` = `""`

## מחזיר

`string`

## דוגמה

```tsx
import { readToken } from "@pantoken/react";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
