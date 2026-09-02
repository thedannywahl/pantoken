[pantoken](../../../../index.md) / [platforms/compose/src](../index.md) / generateCompose

# Funktion: generateCompose()

> **generateCompose**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Udsend Compose Kotlin til et navngivet tema. Returnerer den skrevne filsti.

## Parametre

### options

[`GenerateComposeOptions`](../interfaces/GenerateComposeOptions.md)

## Returnerer

`Promise`\<`string`\>

## Eksempel

```ts
import { generateCompose } from "@pantoken/compose";

const file = await generateCompose({ outDir: "./ui/tokens", theme: "rebrand" });
```
