[pantoken](../../../../index.md) / [packages/core/src](../index.md) / resolveReferences

# Funkcija: resolveReferences()

> **resolveReferences**(`tokens`, `mode?`): `Map`\<`string`, `string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Resolve every token to a concrete, single-mode value: expand `var(...)` chains and collapse
`light-dark()` to the chosen `mode`.

## Parametri

### tokens

readonly [`Token`](../interfaces/Token.md)[]

The IR.

### mode?

[`Mode`](../type-aliases/Mode.md) = `"light"`

Which side of `light-dark()` to keep (default `"light"`).

## Vrne

`Map`\<`string`, `string`\>

A map of token name to concrete value.

## Primer

**Resolve the built IR to concrete dark-mode values**

```ts
import { buildTokens, resolveReferences } from "@pantoken/core";

const resolved = resolveReferences(buildTokens(), "dark");
resolved.get("--instui-color-background-base"); // → a concrete "#…" value
```
