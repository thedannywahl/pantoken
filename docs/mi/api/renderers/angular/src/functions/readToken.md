[pantoken](../../../../index.md) / [renderers/angular/src](../index.md) / readToken

# Mahi: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Whakamātautau</span>

Read a resolved token value. Returns `fallback` on the server.

## Ngā Tawhā

### name

`string`

### fallback?

`string` = `""`

## Whakahokia

`string`

## Tauira

```ts
import { readToken } from "@pantoken/angular";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
