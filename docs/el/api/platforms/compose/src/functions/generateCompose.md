[pantoken](../../../../index.md) / [platforms/compose/src](../index.md) / generateCompose

# Συνάρτηση: generateCompose()

> **generateCompose**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Πειραματικό</span>

Emit Compose Kotlin for a named theme. Returns the written file path.

## Παράμετροι

### options

[`GenerateComposeOptions`](../interfaces/GenerateComposeOptions.md)

## Επιστρέφει

`Promise`\<`string`\>

## Παράδειγμα

```ts
import { generateCompose } from "@pantoken/compose";

const file = await generateCompose({ outDir: "./ui/tokens", theme: "rebrand" });
```
