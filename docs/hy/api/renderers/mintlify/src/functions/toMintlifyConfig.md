[pantoken](../../../../index.md) / [renderers/mintlify/src](../index.md) / toMintlifyConfig

# Function: toMintlifyConfig()

> **toMintlifyConfig**(`tokens`): [`MintlifyTheme`](../interfaces/MintlifyTheme.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Կառուցել Mintlify `docs.json` թեմայական ստեղները տոկեն IR-ից:

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

IR (օր. `@pantoken/tokens`-ից):

## Returns

[`MintlifyTheme`](../interfaces/MintlifyTheme.md)

`colors` + `background` ստեղները միաձուլել Mintlify `docs.json`-ի մեջ:

## Example

```ts
import { toMintlifyConfig } from "@pantoken/mintlify";
import { tokens } from "@pantoken/tokens";

const theme = toMintlifyConfig(tokens);
// { colors: { primary: "#1D354F", light: "#EEF4FD", dark: "#1D354F" },
//   background: { color: { light: "#F2F4F5", dark: "#10141A" } } }
```
