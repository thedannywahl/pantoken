[pantoken](../../../../index.md) / [renderers/mintlify/src](../index.md) / toMintlifyConfig

# Function: toMintlifyConfig()

> **toMintlifyConfig**(`tokens`): [`MintlifyTheme`](../interfaces/MintlifyTheme.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Construeix les claus de temàtica `docs.json` de Mintlify a partir d'un IR de token.

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

La IR (p. ex. de `@pantoken/tokens`).

## Returns

[`MintlifyTheme`](../interfaces/MintlifyTheme.md)

Les claus `colors` + `background` per fusionar en una `docs.json` de Mintlify.

## Example

```ts
import { toMintlifyConfig } from "@pantoken/mintlify";
import { tokens } from "@pantoken/tokens";

const theme = toMintlifyConfig(tokens);
// { colors: { primary: "#1D354F", light: "#EEF4FD", dark: "#1D354F" },
//   background: { color: { light: "#F2F4F5", dark: "#10141A" } } }
```
