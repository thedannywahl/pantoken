[pantoken](../../../../index.md) / [renderers/angular/src](../index.md) / readToken

# Funktio: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Kokeellinen</span>

Read a resolved token value. Returns `fallback` on the server.

## Parametrit

### name

`string`

### fallback?

`string` = `""`

## Palauttaa

`string`

## Esimerkki

```ts
import { readToken } from "@pantoken/angular";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
