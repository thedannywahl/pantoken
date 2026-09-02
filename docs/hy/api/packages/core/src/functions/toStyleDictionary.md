[pantoken](../../../../index.md) / [packages/core/src](../index.md) / toStyleDictionary

# Ֆունկցիա: toStyleDictionary()

> **toStyleDictionary**(`tokens`, `mode?`): `Record`\<`string`, [`SdLeaf`](../interfaces/SdLeaf.md)\>

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Shape լուծված IR որպես flat Style Dictionary token dictionary բանալուներ token անվամով (առաջատար `--` հանված): Feed դա `tools/sd-config`-ի native emitters-ի համար:

## Պարամետրեր

### tokens

readonly [`Token`](../interfaces/Token.md)[]

The IR:

### mode?

[`Mode`](../type-aliases/Mode.md) = `"light"`

Որ գույնի ռեժիմ լուծել (լռելյայն `"light"`).

## Վերադարձվող արժեք

`Record`\<`string`, [`SdLeaf`](../interfaces/SdLeaf.md)\>

Style Dictionary dictionary object:

## Օրինակ

**Shape IR native lineage-ի համար**

```ts
import { buildTokens, toStyleDictionary } from "@pantoken/core";

const dictionary = toStyleDictionary(buildTokens(), "light");
// → { "instui-color-background-base": { value: "#…", type: "color" }, … }
// keys drop the leading "--"; feed this to tools/sd-config.
```
