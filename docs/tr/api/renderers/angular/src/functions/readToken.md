[pantoken](../../../../index.md) / [renderers/angular/src](../index.md) / readToken

# Fonksiyon: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Deneysel</span>

Read a resolved token value. Returns `fallback` on the server.

## Parametreler

### name

`string`

### fallback?

`string` = `""`

## Döndürür

`string`

## Örnek

```ts
import { readToken } from "@pantoken/angular";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
