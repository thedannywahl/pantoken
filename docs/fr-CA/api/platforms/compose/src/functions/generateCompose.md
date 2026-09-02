[pantoken](../../../../index.md) / [platforms/compose/src](../index.md) / generateCompose

# Fonction: generateCompose()

> **generateCompose**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Expérimental</span>

Emit Compose Kotlin for a named theme. Returns the written file path.

## Paramètres

### options

[`GenerateComposeOptions`](../interfaces/GenerateComposeOptions.md)

## Retourne

`Promise`\<`string`\>

## Exemple

```ts
import { generateCompose } from "@pantoken/compose";

const file = await generateCompose({ outDir: "./ui/tokens", theme: "rebrand" });
```
