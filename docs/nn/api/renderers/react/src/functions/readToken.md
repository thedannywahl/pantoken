[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / readToken

# Funksjon: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentell</span>

Read a resolved token value from the document. Returns `fallback` on the server.

## Parametrar

### name

`string`

### fallback?

`string` = `""`

## Returnerer

`string`

## Døme

```tsx
import { readToken } from "@pantoken/react";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
