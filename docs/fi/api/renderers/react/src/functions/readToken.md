[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / readToken

# Funktio: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Kokeellinen</span>

Read a resolved token value from the document. Returns `fallback` on the server.

## Parametrit

### name

`string`

### fallback?

`string` = `""`

## Palauttaa

`string`

## Esimerkki

```tsx
import { readToken } from "@pantoken/react";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
