[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / resolveTokens

# Функція: resolveTokens()

> **resolveTokens**(`base`, `options?`): `Map`\<`string`, `string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Resolve every token's value against the set (see [makeResolver](makeResolver.md)), keyed by name.

## Параметри

### base

readonly [`Token`](../../../core/src/interfaces/Token.md)[]

### options?

[`ResolveOptions`](../interfaces/ResolveOptions.md) = `{}`

## Повертає

`Map`\<`string`, `string`\>

## Приклад

**Resolve a whole IR to a name → value map**

```ts
import { resolveTokens } from "@pantoken/utils";
import type { Token } from "@pantoken/model";

const ir: Token[] = [
  { name: "--instui-leaf", syntax: "<color>", inherits: true, value: "#0374B5" },
  { name: "--instui-brand", syntax: "*", inherits: true, value: "var(--instui-leaf)" },
  { name: "--instui-bg", syntax: "*", inherits: true, value: "light-dark(#fff, #000)" },
];

const byName = resolveTokens(ir, { mode: "dark" });
byName.get("--instui-brand"); // → "#0374B5"
byName.get("--instui-bg");    // → "#000"
```
