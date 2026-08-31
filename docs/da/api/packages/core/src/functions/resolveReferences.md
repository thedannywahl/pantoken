[pantoken](../../../../index.md) / [packages/core/src](../index.md) / resolveReferences

# Function: resolveReferences()

> **resolveReferences**(`tokens`, `mode?`): `Map`\<`string`, `string`>>>>\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Løs hvert token til en konkret, enkelt-tilstand værdi: udvidelse af `var(...)`-kæder og sammenfald
`light-dark()` til den valgte `mode`.

## Parameters

### tokens

readonly [`Token`](../interfaces/Token.md)[]

IR'en.

### mode?

[`Mode`](../type-aliases/Mode.md) = `"light"`

Hvilken side af `light-dark()` skal beholdes (standard `"light"`).

## Returns

`Map`\<`string`, `string`\>

Et kort over token-navn til konkret værdi.

## Example

**Løs det bygget IR til konkrete mørk-tilstand værdier**

```ts
import { buildTokens, resolveReferences } from "@pantoken/core";

const resolved = resolveReferences(buildTokens(), "dark");
resolved.get("--instui-color-background-base"); // → a concrete "#…" value
```
