[pantoken](../../../../index.md) / [packages/model/src](../index.md) / defineToken

# 函式: defineToken()

> **defineToken**(`input`): [`Token`](../interfaces/Token.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

Build a well-formed [Token](../interfaces/Token.md) from partial input, defaulting `syntax` to `"*"` and
`inherits` to `true`. Plugins import this from `@pantoken/model` to avoid depending on
`@pantoken/core`; for smart CSS syntax inference use `defineToken` from `@pantoken/core`.

## 參數

### input

[`TokenInput`](../interfaces/TokenInput.md)

## 回傳

[`Token`](../interfaces/Token.md)

## 範例

```ts
import { defineToken } from "@pantoken/model";

defineToken({ name: "--instui-brand", value: "#0374B5" });
// → { name: "--instui-brand", syntax: "*", inherits: true, value: "#0374B5" }
```
