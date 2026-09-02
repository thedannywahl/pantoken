[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / readToken

# Fonksiyon: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Deneysel</span>

Read a resolved token value from the document. Returns `fallback` on the server.

## Parametreler

### name

`string`

### fallback?

`string` = `""`

## Döndürür

`string`

## Örnek

```tsx
import { readToken } from "@pantoken/react";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
