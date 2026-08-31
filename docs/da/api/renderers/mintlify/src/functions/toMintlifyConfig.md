[pantoken](../../../../index.md) / [renderers/mintlify/src](../index.md) / toMintlifyConfig

# Function: toMintlifyConfig()

> **toMintlifyConfig**(`tokens`): [`MintlifyTheme`](../interfaces/MintlifyTheme.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Byg Mintlify `docs.json` tematiserings-nøgler fra en token IR.

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

IR'en (f.eks. fra `@pantoken/tokens`).

## Returns

[`MintlifyTheme`](../interfaces/MintlifyTheme.md)

`colors` + `background` nøgler til at flette ind i en Mintlify `docs.json`.

## Example

```ts
import { toMintlifyConfig } from "@pantoken/mintlify";
import { tokens } from "@pantoken/tokens";

const theme = toMintlifyConfig(tokens);
// { colors: { primary: "#1D354F", light: "#EEF4FD", dark: "#1D354F" },
//   background: { color: { light: "#F2F4F5", dark: "#10141A" } } }
```
