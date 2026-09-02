[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / readToken

# Funktion: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Læs en opløst tokenværdi. Returnerer `fallback` på serveren.

## Parametre

### name

`string`

### fallback?

`string` = `""`

## Returnerer

`string`

## Eksempel

```ts
import { readToken } from "@pantoken/svelte";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
