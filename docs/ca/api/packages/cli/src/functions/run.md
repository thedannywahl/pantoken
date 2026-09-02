[pantoken](../../../../index.md) / [packages/cli/src](../index.md) / run

# Funció: run()

> **run**(`argv`): `Promise`\<`void`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Executar la CLI.

## Paràmetres

### argv

readonly `string`[]

## Retorna

`Promise`\<`void`\>

## Exemples

**Generar tokens Swift en un dipòsit consumidor**

```ts
import { run } from "@pantoken/cli";

// Writes Sources/PanTokens/Tokens.swift + Package.swift under ./ios/DesignTokens.
await run(["generate", "swift", "--out", "./ios/DesignTokens"]);
```

**Generar una paleta de mostres temàtica en un format específic**

```ts
import { run } from "@pantoken/cli";

await run(["generate", "swatches", "--format", "gpl", "--theme", "canvas", "--out", "./out"]);
```
