[pantoken](../../../../index.md) / [packages/core/src](../index.md) / defineToken

# Function: defineToken()

> **defineToken**(`input`): [`Token`](../interfaces/Token.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Byg et fuldt dannet [Token](../interfaces/Token.md) fra partielt input, standardindstillinger `inherits` og `syntax`.

## Parameters

### input

[`TokenInput`](../interfaces/TokenInput.md)

## Returns

[`Token`](../interfaces/Token.md)

## Examples

**Sniff syntaks fra en konkret værdi**

```ts
import { defineToken } from "@pantoken/core";

defineToken({ name: "--instui-color-x", value: "#0374B5" });
// → { name: "--instui-color-x", syntax: "<color>", inherits: true, value: "#0374B5" }
```

**En enkelt var()-værdi registrerer refersTo; en light-dark() sætter temabased**

```ts
import { defineToken } from "@pantoken/core";

defineToken({ name: "--instui-brand", value: "var(--instui-color-background-brand)" });
// → syntax "*", refersTo: "--instui-color-background-brand"

defineToken({ name: "--instui-bg", value: "light-dark(#fff, #000)" });
// → syntax "*", themed: true
```
