[pantoken](../../../../index.md) / [packages/core/src](../index.md) / toStyleDictionary

# Funktion: toStyleDictionary()

> **toStyleDictionary**(`tokens`, `mode?`): `Record`\<`string`, [`SdLeaf`](../interfaces/SdLeaf.md)\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Form den løst IR som en flad Style Dictionary token-ordbog nøglet efter token-navn (med
ledende `--` fjernet). Feed dette til `tools/sd-config` for de native emsitere.

## Parametre

### tokens

readonly [`Token`](../interfaces/Token.md)[]

IR'en.

### mode?

[`Mode`](../type-aliases/Mode.md) = `"light"`

Hvilken farvetilstand skal løses (standard `"light"`).

## Returnerer

`Record`\<`string`, [`SdLeaf`](../interfaces/SdLeaf.md)\>

Et Style Dictionary ordbogs objekt.

## Eksempel

**Form IR'en for den native linje**

```ts
import { buildTokens, toStyleDictionary } from "@pantoken/core";

const dictionary = toStyleDictionary(buildTokens(), "light");
// → { "instui-color-background-base": { value: "#…", type: "color" }, … }
// keys drop the leading "--"; feed this to tools/sd-config.
```
