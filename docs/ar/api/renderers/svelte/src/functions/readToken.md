[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / readToken

# Function: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

اقرأ قيمة رمز مُحلَّة. يعيد `fallback` على الخادم.

## Parameters

### name

`string`

### fallback?

`string` = `""`

## Returns

`string`

## Example

```ts
import { readToken } from "@pantoken/svelte";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
