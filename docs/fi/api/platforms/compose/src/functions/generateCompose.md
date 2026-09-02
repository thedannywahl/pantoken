[pantoken](../../../../index.md) / [platforms/compose/src](../index.md) / generateCompose

# Funktio: generateCompose()

> **generateCompose**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Kokeellinen</span>

Emit Compose Kotlin for a named theme. Returns the written file path.

## Parametrit

### options

[`GenerateComposeOptions`](../interfaces/GenerateComposeOptions.md)

## Palauttaa

`Promise`\<`string`\>

## Esimerkki

```ts
import { generateCompose } from "@pantoken/compose";

const file = await generateCompose({ outDir: "./ui/tokens", theme: "rebrand" });
```
