[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / readToken

# Συνάρτηση: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Πειραματικό</span>

Read a resolved token value from the document. Returns `fallback` on the server.

## Παράμετροι

### name

`string`

### fallback?

`string` = `""`

## Επιστρέφει

`string`

## Παράδειγμα

```tsx
import { readToken } from "@pantoken/react";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
