[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / readToken

# Funzione: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Sperimentale</span>

Read a resolved token value from the document. Returns `fallback` on the server.

## Parametri

### name

`string`

### fallback?

`string` = `""`

## Restituisce

`string`

## Esempio

```tsx
import { readToken } from "@pantoken/react";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
