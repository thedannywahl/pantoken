[pantoken](../../../../index.md) / [packages/cli/src](../index.md) / run

# פונקציה: run()

> **run**(`argv`): `Promise`\<`void`\>

<span class="instui-pill -color-warning pantoken-doc-tag">בטא</span>

Run the CLI.

## פרמטרים

### argv

readonly `string`[]

## מחזיר

`Promise`\<`void`\>

## דוגמאות

**Generate Swift tokens into a consumer repo**

```ts
import { run } from "@pantoken/cli";

// Writes Sources/PanTokens/Tokens.swift + Package.swift under ./ios/DesignTokens.
await run(["generate", "swift", "--out", "./ios/DesignTokens"]);
```

**Generate a themed swatch palette in a specific format**

```ts
import { run } from "@pantoken/cli";

await run(["generate", "swatches", "--format", "gpl", "--theme", "canvas", "--out", "./out"]);
```
