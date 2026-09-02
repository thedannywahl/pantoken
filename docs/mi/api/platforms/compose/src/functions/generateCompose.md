[pantoken](../../../../index.md) / [platforms/compose/src](../index.md) / generateCompose

# Mahi: generateCompose()

> **generateCompose**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Whakamātautau</span>

Emit Compose Kotlin for a named theme. Returns the written file path.

## Ngā Tawhā

### options

[`GenerateComposeOptions`](../interfaces/GenerateComposeOptions.md)

## Whakahokia

`Promise`\<`string`\>

## Tauira

```ts
import { generateCompose } from "@pantoken/compose";

const file = await generateCompose({ outDir: "./ui/tokens", theme: "rebrand" });
```
