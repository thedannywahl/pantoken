[pantoken](../../../../index.md) / [platforms/compose/src](../index.md) / generateCompose

# 関数: generateCompose()

> **generateCompose**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">実験的</span>

Emit Compose Kotlin for a named theme. Returns the written file path.

## パラメーター

### options

[`GenerateComposeOptions`](../interfaces/GenerateComposeOptions.md)

## 戻り値

`Promise`\<`string`\>

## 例

```ts
import { generateCompose } from "@pantoken/compose";

const file = await generateCompose({ outDir: "./ui/tokens", theme: "rebrand" });
```
