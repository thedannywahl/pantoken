[pantoken](../../../../index.md) / [platforms/compose/src](../index.md) / generateCompose

# Hàm: generateCompose()

> **generateCompose**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Thử nghiệm</span>

Emit Compose Kotlin for a named theme. Returns the written file path.

## Tham số

### options

[`GenerateComposeOptions`](../interfaces/GenerateComposeOptions.md)

## Trả về

`Promise`\<`string`\>

## Ví dụ

```ts
import { generateCompose } from "@pantoken/compose";

const file = await generateCompose({ outDir: "./ui/tokens", theme: "rebrand" });
```
