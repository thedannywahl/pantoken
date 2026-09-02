[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / readToken

# Fall: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Tilrauna</span>

Read a resolved token value from the document. Returns `fallback` on the server.

## Færibreytur

### name

`string`

### fallback?

`string` = `""`

## Skilar

`string`

## Dæmi

```tsx
import { readToken } from "@pantoken/react";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
