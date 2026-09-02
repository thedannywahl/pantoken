[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / readToken

# Funkcija: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentalno</span>

Read a resolved token value from the document. Returns `fallback` on the server.

## Parametri

### name

`string`

### fallback?

`string` = `""`

## Vrne

`string`

## Primer

```tsx
import { readToken } from "@pantoken/react";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
