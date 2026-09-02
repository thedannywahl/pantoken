[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / readToken

# Funkcja: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperymentalne</span>

Read a resolved token value from the document. Returns `fallback` on the server.

## Parametry

### name

`string`

### fallback?

`string` = `""`

## Zwraca

`string`

## Przykład

```tsx
import { readToken } from "@pantoken/react";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
