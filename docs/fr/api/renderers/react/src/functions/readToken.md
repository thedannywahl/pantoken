[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / readToken

# Fonction: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Expérimental</span>

Read a resolved token value from the document. Returns `fallback` on the server.

## Paramètres

### name

`string`

### fallback?

`string` = `""`

## Renvoie

`string`

## Exemple

```tsx
import { readToken } from "@pantoken/react";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
