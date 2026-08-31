[pantoken](../../../../index.md) / [packages/core/src](../index.md) / toStyleDictionary

# Function: toStyleDictionary()

> **toStyleDictionary**(`tokens`, `mode?`): `Record`\<`string`, [`SdLeaf`](../interfaces/SdLeaf.md)>>>>\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Formata la IR resuelta com a un diccionari de tokens de Style Dictionary pla indexat per nom de token (amb el
`--` principal despullat). Alimenta-ho a `tools/sd-config` per als emissors natives.

## Parameters

### tokens

readonly [`Token`](../interfaces/Token.md)[]

La IR.

### mode?

[`Mode`](../type-aliases/Mode.md) = `"light"`

Quin mode de color resoldre (per defecte `"light"`).

## Returns

`Record`\<`string`, [`SdLeaf`](../interfaces/SdLeaf.md)\>

Un objecte diccionari de Style Dictionary.

## Example

**Formata la IR per al llinatge natiu**

```ts
import { buildTokens, toStyleDictionary } from "@pantoken/core";

const dictionary = toStyleDictionary(buildTokens(), "light");
// → { "instui-color-background-base": { value: "#…", type: "color" }, … }
// keys drop the leading "--"; feed this to tools/sd-config.
```
