[pantoken](../../../../index.md) / [platforms/compose/src](../index.md) / generateCompose

# تابع: generateCompose()

> **generateCompose**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">تجربی</span>

Emit Compose Kotlin for a named theme. Returns the written file path.

## پارامترها

### options

[`GenerateComposeOptions`](../interfaces/GenerateComposeOptions.md)

## مقدار بازگشتی

`Promise`\<`string`\>

## نمونه

```ts
import { generateCompose } from "@pantoken/compose";

const file = await generateCompose({ outDir: "./ui/tokens", theme: "rebrand" });
```
