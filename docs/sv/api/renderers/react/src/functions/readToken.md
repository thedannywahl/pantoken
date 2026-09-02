[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / readToken

# Funktion: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimentell</span>

Read a resolved token value from the document. Returns `fallback` on the server.

## Parametrar

### name

`string`

### fallback?

`string` = `""`

## Returnerar

`string`

## Exempel

```tsx
import { readToken } from "@pantoken/react";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
