[pantoken](../../../../index.md) / [packages/cli/src](../index.md) / run

# Funktion: run()

> **run**(`argv`): `Promise`\<`void`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Kør CLI'en.

## Parametre

### argv

readonly `string`[]

## Returnerer

`Promise`\<`void`\>

## Eksempler

**Generer Swift-tokens til en forbrugerlager**

```ts
import { run } from "@pantoken/cli";

// Writes Sources/PanTokens/Tokens.swift + Package.swift under ./ios/DesignTokens.
await run(["generate", "swift", "--out", "./ios/DesignTokens"]);
```

**Generer en tema-farvepalette i et bestemt format**

```ts
import { run } from "@pantoken/cli";

await run(["generate", "swatches", "--format", "gpl", "--theme", "canvas", "--out", "./out"]);
```
