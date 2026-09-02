[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / readToken

# Fonksyon: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimantal</span>

Read a resolved token value from the document. Returns `fallback` on the server.

## Paramèt

### name

`string`

### fallback?

`string` = `""`

## Retounen

`string`

## Egzanp

```tsx
import { readToken } from "@pantoken/react";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
