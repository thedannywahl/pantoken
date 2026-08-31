[pantoken](../../../../index.md) / [renderers/angular/src](../index.md) / readToken

# Function: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Կարդալ լուծված token արժեքը: Վերադարձնում է `fallback`-ը server-ի վրա:

## Parameters

### name

`string`

### fallback?

`string` = `""`

## Returns

`string`

## Example

```ts
import { readToken } from "@pantoken/angular";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
