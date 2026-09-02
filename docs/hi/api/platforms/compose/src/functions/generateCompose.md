[pantoken](../../../../index.md) / [platforms/compose/src](../index.md) / generateCompose

# फंक्शन: generateCompose()

> **generateCompose**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">प्रयोगात्मक</span>

Emit Compose Kotlin for a named theme. Returns the written file path.

## पैरामीटर

### options

[`GenerateComposeOptions`](../interfaces/GenerateComposeOptions.md)

## वापसी

`Promise`\<`string`\>

## उदाहरण

```ts
import { generateCompose } from "@pantoken/compose";

const file = await generateCompose({ outDir: "./ui/tokens", theme: "rebrand" });
```
