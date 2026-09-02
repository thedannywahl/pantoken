[pantoken](../../../../index.md) / [packages/core/src](../index.md) / defineToken

# ฟังก์ชัน: defineToken()

> **defineToken**(`input`): [`Token`](../interfaces/Token.md)

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

Build a fully-formed [Token](../interfaces/Token.md) from partial input, defaulting `inherits` and `syntax`.

## พารามิเตอร์

### input

[`TokenInput`](../interfaces/TokenInput.md)

## คืนค่า

[`Token`](../interfaces/Token.md)

## ตัวอย่าง

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
