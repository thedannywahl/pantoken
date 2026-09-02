[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / readToken

# Functie: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimenteel</span>

Read a resolved token value from the document. Returns `fallback` on the server.

## Parameters

### name

`string`

### fallback?

`string` = `""`

## Retourneert

`string`

## Voorbeeld

```tsx
import { readToken } from "@pantoken/react";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
