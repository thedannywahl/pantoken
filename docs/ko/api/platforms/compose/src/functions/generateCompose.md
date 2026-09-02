[pantoken](../../../../index.md) / [platforms/compose/src](../index.md) / generateCompose

# 함수: generateCompose()

> **generateCompose**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">실험적</span>

Emit Compose Kotlin for a named theme. Returns the written file path.

## 매개변수

### options

[`GenerateComposeOptions`](../interfaces/GenerateComposeOptions.md)

## 반환값

`Promise`\<`string`\>

## 예제

```ts
import { generateCompose } from "@pantoken/compose";

const file = await generateCompose({ outDir: "./ui/tokens", theme: "rebrand" });
```
