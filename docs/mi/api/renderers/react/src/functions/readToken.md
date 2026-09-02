[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / readToken

# Mahi: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Whakamātautau</span>

Read a resolved token value from the document. Returns `fallback` on the server.

## Ngā Tawhā

### name

`string`

### fallback?

`string` = `""`

## Whakahokia

`string`

## Tauira

```tsx
import { readToken } from "@pantoken/react";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
