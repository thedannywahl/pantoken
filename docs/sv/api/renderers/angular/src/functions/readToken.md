[pantoken](../../../../index.md) / [renderers/angular/src](../index.md) / readToken

# Funktion: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimentell</span>

Read a resolved token value. Returns `fallback` on the server.

## Parametrar

### name

`string`

### fallback?

`string` = `""`

## Returnerar

`string`

## Exempel

```ts
import { readToken } from "@pantoken/angular";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
