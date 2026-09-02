[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / readToken

# Funktion: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Læs en opløst tokenværdi fra dokumentet. Returnerer `fallback` på serveren.

## Parametre

### name

`string`

### fallback?

`string` = `""`

## Returnerer

`string`

## Eksempel

```tsx
import { readToken } from "@pantoken/react";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
