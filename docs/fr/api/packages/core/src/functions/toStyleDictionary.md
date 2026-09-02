[pantoken](../../../../index.md) / [packages/core/src](../index.md) / toStyleDictionary

# Fonction: toStyleDictionary()

> **toStyleDictionary**(`tokens`, `mode?`): `Record`\<`string`, [`SdLeaf`](../interfaces/SdLeaf.md)\>

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

Shape the resolved IR as a flat Style Dictionary token dictionary keyed by token name (with the
leading `--` stripped). Feed this to `tools/sd-config` for the native emitters.

## Paramètres

### tokens

readonly [`Token`](../interfaces/Token.md)[]

The IR.

### mode?

[`Mode`](../type-aliases/Mode.md) = `"light"`

Which colour mode to resolve (default `"light"`).

## Renvoie

`Record`\<`string`, [`SdLeaf`](../interfaces/SdLeaf.md)\>

A Style Dictionary dictionary object.

## Exemple

**Shape the IR for the native lineage**

```ts
import { buildTokens, toStyleDictionary } from "@pantoken/core";

const dictionary = toStyleDictionary(buildTokens(), "light");
// → { "instui-color-background-base": { value: "#…", type: "color" }, … }
// keys drop the leading "--"; feed this to tools/sd-config.
```
