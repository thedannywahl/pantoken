[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / resolveTokens

# Feidhm: resolveTokens()

> **resolveTokens**(`base`, `options?`): `Map`\<`string`, `string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Béite</span>

Resolve every token's value against the set (see [makeResolver](makeResolver.md)), keyed by name.

## Paraiméadair

### base

readonly [`Token`](../../../core/src/interfaces/Token.md)[]

### options?

[`ResolveOptions`](../interfaces/ResolveOptions.md)

## Tuairisceáin

`Map`\<`string`, `string`\>

## Sampla

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
