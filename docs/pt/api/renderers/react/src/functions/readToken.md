[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / readToken

# Função: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Read a resolved token value from the document. Returns `fallback` on the server.

## Parâmetros

### name

`string`

### fallback?

`string` = `""`

## Retorna

`string`

## Exemplo

```tsx
import { readToken } from "@pantoken/react";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
