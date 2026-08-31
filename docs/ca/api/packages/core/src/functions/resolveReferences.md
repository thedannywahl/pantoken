[pantoken](../../../../index.md) / [packages/core/src](../index.md) / resolveReferences

# Function: resolveReferences()

> **resolveReferences**(`tokens`, `mode?`): `Map`\<`string`, `string`>>>>\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Resol cada token a un valor concret de mode únic: expandeix les cadenes `var(...)` i contreu
`light-dark()` a l'escollit `mode`.

## Parameters

### tokens

readonly [`Token`](../interfaces/Token.md)[]

La IR.

### mode?

[`Mode`](../type-aliases/Mode.md) = `"light"`

Quin costat de `light-dark()` mantenir (per defecte `"light"`).

## Returns

`Map`\<`string`, `string`\>

Un mapa del nom del token al valor concret.

## Example

**Resol la IR construïda a valors de mode fosc concrets**

```ts
import { buildTokens, resolveReferences } from "@pantoken/core";

const resolved = resolveReferences(buildTokens(), "dark");
resolved.get("--instui-color-background-base"); // → a concrete "#…" value
```
