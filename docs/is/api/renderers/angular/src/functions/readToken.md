[pantoken](../../../../index.md) / [renderers/angular/src](../index.md) / readToken

# Fall: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Tilrauna</span>

Read a resolved token value. Returns `fallback` on the server.

## Færibreytur

### name

`string`

### fallback?

`string` = `""`

## Skilar

`string`

## Dæmi

```ts
import { readToken } from "@pantoken/angular";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
