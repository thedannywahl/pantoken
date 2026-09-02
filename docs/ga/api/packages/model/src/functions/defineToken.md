[pantoken](../../../../index.md) / [packages/model/src](../index.md) / defineToken

# Feidhm: defineToken()

> **defineToken**(`input`): [`Token`](../interfaces/Token.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Béite</span>

Build a well-formed [Token](../interfaces/Token.md) from partial input, defaulting `syntax` to `"*"` and
`inherits` to `true`. Plugins import this from `@pantoken/model` to avoid depending on
`@pantoken/core`; for smart CSS syntax inference use `defineToken` from `@pantoken/core`.

## Paraiméadair

### input

[`TokenInput`](../interfaces/TokenInput.md)

## Tuairisceáin

[`Token`](../interfaces/Token.md)

## Sampla

```ts
import { defineToken } from "@pantoken/model";

defineToken({ name: "--instui-brand", value: "#0374B5" });
// → { name: "--instui-brand", syntax: "*", inherits: true, value: "#0374B5" }
```
