[pantoken](../../../../index.md) / [packages/core/src](../index.md) / resolveReferences

# Function: resolveReferences()

> **resolveReferences**(`tokens`, `mode?`): `Map`\<`string`, `string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Լուծեք յուրաքանչյուր token concrete, միայն-ռեժիմ արժեքի՝ expand `var(...)` chains և collapse `light-dark()` ընտրված `mode`-ի:

## Parameters

### tokens

readonly [`Token`](../interfaces/Token.md)[]

The IR:

### mode?

[`Mode`](../type-aliases/Mode.md) = `"light"`

Որ կողմ `light-dark()`-ի պահել (լռելյալ `"light"`):

## Returns

`Map`\<`string`, `string`\>

Token անվամից concrete արժեքի map:

## Example

**Լուծեք կառուցված IR concrete dark-mode արժեքներին**

```ts
import { buildTokens, resolveReferences } from "@pantoken/core";

const resolved = resolveReferences(buildTokens(), "dark");
resolved.get("--instui-color-background-base"); // → a concrete "#…" value
```
