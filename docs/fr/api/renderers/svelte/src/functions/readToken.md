[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / readToken

# Fonction: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Expérimental</span>

Read a resolved token value. Returns `fallback` on the server.

## Paramètres

### name

`string`

### fallback?

`string` = `""`

## Renvoie

`string`

## Exemple

```ts
import { readToken } from "@pantoken/svelte";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
