[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / readToken

# Function: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Læs en opløst tokenværdi fra dokumentet. Returnerer `fallback` på serveren.

## Parameters

### name

`string`

### fallback?

`string` = `""`

## Returns

`string`

## Example

```tsx
import { readToken } from "@pantoken/react";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
