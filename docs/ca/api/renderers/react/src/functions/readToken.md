[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / readToken

# Funció: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Llegeix un valor de token resolt del document. Retorna `fallback` al servidor.

## Paràmetres

### name

`string`

### fallback?

`string` = `""`

## Retorna

`string`

## Exemple

```tsx
import { readToken } from "@pantoken/react";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
