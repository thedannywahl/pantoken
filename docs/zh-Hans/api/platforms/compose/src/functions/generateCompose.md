[pantoken](../../../../index.md) / [platforms/compose/src](../index.md) / generateCompose

# 函数: generateCompose()

> **generateCompose**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">实验性</span>

Emit Compose Kotlin for a named theme. Returns the written file path.

## 参数

### options

[`GenerateComposeOptions`](../interfaces/GenerateComposeOptions.md)

## 返回值

`Promise`\<`string`\>

## 示例

```ts
import { generateCompose } from "@pantoken/compose";

const file = await generateCompose({ outDir: "./ui/tokens", theme: "rebrand" });
```
