[pantoken](../../../../index.md) / [packages/core/src](../index.md) / resolveReferences

# Ֆունկցիա: resolveReferences()

> **resolveReferences**(`tokens`, `mode?`): `Map`\<`string`, `string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Լուծեք յուրաքանչյուր token concrete, միայն-ռեժիմ արժեքի՝ expand `var(...)` chains և collapse `light-dark()` ընտրված `mode`-ի:

## Պարամետրեր

### tokens

readonly [`Token`](../interfaces/Token.md)[]

The IR:

### mode?

[`Mode`](../type-aliases/Mode.md) = `"light"`

Որ կողմ `light-dark()`-ի պահել (լռելյալ `"light"`):

## Վերադարձվող արժեք

`Map`\<`string`, `string`\>

Token անվամից concrete արժեքի map:

## Օրինակ

**Լուծեք կառուցված IR concrete dark-mode արժեքներին**

```ts
import { buildTokens, resolveReferences } from "@pantoken/core";

const resolved = resolveReferences(buildTokens(), "dark");
resolved.get("--instui-color-background-base"); // → a concrete "#…" value
```
