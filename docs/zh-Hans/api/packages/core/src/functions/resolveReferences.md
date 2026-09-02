[pantoken](../../../../index.md) / [packages/core/src](../index.md) / resolveReferences

# 函数: resolveReferences()

> **resolveReferences**(`tokens`, `mode?`): `Map`\<`string`, `string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Resolve every token to a concrete, single-mode value: expand `var(...)` chains and collapse
`light-dark()` to the chosen `mode`.

## 参数

### tokens

readonly [`Token`](../interfaces/Token.md)[]

The IR.

### mode?

[`Mode`](../type-aliases/Mode.md) = `"light"`

Which side of `light-dark()` to keep (default `"light"`).

## 返回值

`Map`\<`string`, `string`\>

A map of token name to concrete value.

## 示例

**Resolve the built IR to concrete dark-mode values**

```ts
import { buildTokens, resolveReferences } from "@pantoken/core";

const resolved = resolveReferences(buildTokens(), "dark");
resolved.get("--instui-color-background-base"); // → a concrete "#…" value
```
