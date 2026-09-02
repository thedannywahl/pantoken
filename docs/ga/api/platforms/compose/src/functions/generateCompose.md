[pantoken](../../../../index.md) / [platforms/compose/src](../index.md) / generateCompose

# Feidhm: generateCompose()

> **generateCompose**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Turgnamhach</span>

Emit Compose Kotlin for a named theme. Returns the written file path.

## Paraiméadair

### options

[`GenerateComposeOptions`](../interfaces/GenerateComposeOptions.md)

## Tuairisceáin

`Promise`\<`string`\>

## Sampla

```ts
import { generateCompose } from "@pantoken/compose";

const file = await generateCompose({ outDir: "./ui/tokens", theme: "rebrand" });
```
