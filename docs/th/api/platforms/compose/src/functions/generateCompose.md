[pantoken](../../../../index.md) / [platforms/compose/src](../index.md) / generateCompose

# ฟังก์ชัน: generateCompose()

> **generateCompose**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">ทดลอง</span>

Emit Compose Kotlin for a named theme. Returns the written file path.

## พารามิเตอร์

### options

[`GenerateComposeOptions`](../interfaces/GenerateComposeOptions.md)

## คืนค่า

`Promise`\<`string`\>

## ตัวอย่าง

```ts
import { generateCompose } from "@pantoken/compose";

const file = await generateCompose({ outDir: "./ui/tokens", theme: "rebrand" });
```
