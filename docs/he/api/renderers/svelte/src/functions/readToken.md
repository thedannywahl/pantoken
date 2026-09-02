[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / readToken

# פונקציה: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">ניסיוני</span>

Read a resolved token value. Returns `fallback` on the server.

## פרמטרים

### name

`string`

### fallback?

`string` = `""`

## מחזיר

`string`

## דוגמה

```ts
import { readToken } from "@pantoken/svelte";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
