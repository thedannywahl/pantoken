[pantoken](../../../../index.md) / [platforms/compose/src](../index.md) / generateCompose

# دالة: generateCompose()

> **generateCompose**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

يصدر Compose Kotlin لموضوع مسمى. يُرجع مسار الملف المكتوب.

## المعلمات

### options

[`GenerateComposeOptions`](../interfaces/GenerateComposeOptions.md)

## القيم المرجعة

`Promise`\<`string`\>

## مثال

```ts
import { generateCompose } from "@pantoken/compose";

const file = await generateCompose({ outDir: "./ui/tokens", theme: "rebrand" });
```
