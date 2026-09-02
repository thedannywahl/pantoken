[pantoken](../../../../index.md) / [platforms/compose/src](../index.md) / generateCompose

# Funció: generateCompose()

> **generateCompose**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Emet Compose Kotlin per a un tema anomenat. Retorna la ruta del fitxer escrit.

## Paràmetres

### options

[`GenerateComposeOptions`](../interfaces/GenerateComposeOptions.md)

## Retorna

`Promise`\<`string`\>

## Exemple

```ts
import { generateCompose } from "@pantoken/compose";

const file = await generateCompose({ outDir: "./ui/tokens", theme: "rebrand" });
```
