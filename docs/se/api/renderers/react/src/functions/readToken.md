[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / readToken

# Fušla: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentála</span>

Read a resolved token value from the document. Returns `fallback` on the server.

## Parametera

### name

`string`

### fallback?

`string` = `""`

## Gullii / Gávdnat

`string`

## Exempel

```tsx
import { readToken } from "@pantoken/react";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
