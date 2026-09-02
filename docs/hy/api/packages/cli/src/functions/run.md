[pantoken](../../../../index.md) / [packages/cli/src](../index.md) / run

# Ֆունկցիա: run()

> **run**(`argv`): `Promise`\<`void`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Գործարկել CLI-ն։

## Պարամետրեր

### argv

readonly `string`[]

## Վերադարձվող արժեք

`Promise`\<`void`\>

## Օրինակներ

**Գեներացնել Swift tokens սպառողի repo-ում**

```ts
import { run } from "@pantoken/cli";

// Writes Sources/PanTokens/Tokens.swift + Package.swift under ./ios/DesignTokens.
await run(["generate", "swift", "--out", "./ios/DesignTokens"]);
```

**Գեներացնել թեմայական swatch պալետ որոշակի ձևաչափով**

```ts
import { run } from "@pantoken/cli";

await run(["generate", "swatches", "--format", "gpl", "--theme", "canvas", "--out", "./out"]);
```
