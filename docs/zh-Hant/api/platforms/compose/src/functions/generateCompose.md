[pantoken](../../../../index.md) / [platforms/compose/src](../index.md) / generateCompose

# 函式: generateCompose()

> **generateCompose**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">實驗性</span>

Emit Compose Kotlin for a named theme. Returns the written file path.

## 參數

### options

[`GenerateComposeOptions`](../interfaces/GenerateComposeOptions.md)

## 回傳

`Promise`\<`string`\>

## 範例

```ts
import { generateCompose } from "@pantoken/compose";

const file = await generateCompose({ outDir: "./ui/tokens", theme: "rebrand" });
```
