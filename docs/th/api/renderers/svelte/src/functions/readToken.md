[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / readToken

# ฟังก์ชัน: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">ทดลอง</span>

Read a resolved token value. Returns `fallback` on the server.

## พารามิเตอร์

### name

`string`

### fallback?

`string` = `""`

## คืนค่า

`string`

## ตัวอย่าง

```ts
import { readToken } from "@pantoken/svelte";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
