[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / readToken

# Συνάρτηση: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Πειραματικό</span>

Read a resolved token value. Returns `fallback` on the server.

## Παράμετροι

### name

`string`

### fallback?

`string` = `""`

## Επιστρέφει

`string`

## Παράδειγμα

```ts
import { readToken } from "@pantoken/svelte";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
