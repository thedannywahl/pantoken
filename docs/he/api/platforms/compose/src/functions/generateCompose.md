[pantoken](../../../../index.md) / [platforms/compose/src](../index.md) / generateCompose

# פונקציה: generateCompose()

> **generateCompose**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">ניסיוני</span>

Emit Compose Kotlin for a named theme. Returns the written file path.

## פרמטרים

### options

[`GenerateComposeOptions`](../interfaces/GenerateComposeOptions.md)

## מחזיר

`Promise`\<`string`\>

## דוגמה

```ts
import { generateCompose } from "@pantoken/compose";

const file = await generateCompose({ outDir: "./ui/tokens", theme: "rebrand" });
```
