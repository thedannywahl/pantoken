[pantoken](../../../../index.md) / [packages/core/src](../index.md) / defineToken

# Mahi: defineToken()

> **defineToken**(`input`): [`Token`](../interfaces/Token.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Build a fully-formed [Token](../interfaces/Token.md) from partial input, defaulting `inherits` and `syntax`.

## Ngā Tawhā

### input

[`TokenInput`](../interfaces/TokenInput.md)

## Whakahokia

[`Token`](../interfaces/Token.md)

## Ngā tauira

**Sniff syntax from a concrete value**

```ts
import { defineToken } from "@pantoken/core";

defineToken({ name: "--instui-color-x", value: "#0374B5" });
// → { name: "--instui-color-x", syntax: "<color>", inherits: true, value: "#0374B5" }
```

**A single var() value records refersTo; a light-dark() sets themed**

```ts
import { defineToken } from "@pantoken/core";

defineToken({ name: "--instui-brand", value: "var(--instui-color-background-brand)" });
// → syntax "*", refersTo: "--instui-color-background-brand"

defineToken({ name: "--instui-bg", value: "light-dark(#fff, #000)" });
// → syntax "*", themed: true
```
