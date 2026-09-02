[pantoken](../../../../index.md) / [packages/cli/src](../index.md) / run

# Swyddogaeth: run()

> **run**(`argv`): `Promise`\<`void`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

Run the CLI.

## Paramedrau

### argv

readonly `string`[]

## Yn dychwelyd

`Promise`\<`void`\>

## Enghreifftiau

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
