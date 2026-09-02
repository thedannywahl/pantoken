[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / readToken

# Feidhm: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Turgnamhach</span>

Read a resolved token value from the document. Returns `fallback` on the server.

## Paraiméadair

### name

`string`

### fallback?

`string` = `""`

## Tuairisceáin

`string`

## Sampla

```tsx
import { readToken } from "@pantoken/react";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
