[pantoken](../../../../index.md) / [renderers/angular/src](../index.md) / readToken

# Funció: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Llegir un valor de token resolt. Retorna `fallback` al servidor.

## Paràmetres

### name

`string`

### fallback?

`string` = `""`

## Retorna

`string`

## Exemple

```ts
import { readToken } from "@pantoken/angular";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
