[pantoken](../../../../index.md) / [renderers/mintlify/src](../index.md) / toMintlifyConfig

# Function: toMintlifyConfig()

> **toMintlifyConfig**(`tokens`): [`MintlifyTheme`](../interfaces/MintlifyTheme.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

بناء مفاتيح المواضيع `docs.json` من Mintlify من IR للرمز.

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

IR (على سبيل المثال من `@pantoken/tokens`).

## Returns

[`MintlifyTheme`](../interfaces/MintlifyTheme.md)

مفاتيح `colors` + `background` للدمج في `docs.json` من Mintlify.

## Example

```ts
import { toMintlifyConfig } from "@pantoken/mintlify";
import { tokens } from "@pantoken/tokens";

const theme = toMintlifyConfig(tokens);
// { colors: { primary: "#1D354F", light: "#EEF4FD", dark: "#1D354F" },
//   background: { color: { light: "#F2F4F5", dark: "#10141A" } } }
```
