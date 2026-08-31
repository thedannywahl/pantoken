[pantoken](../../../../index.md) / [packages/cli/src](../index.md) / run

# Function: run()

> **run**(`argv`): `Promise`\<`void`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

تشغيل CLI.

## Parameters

### argv

readonly `string`[]

## Returns

`Promise`\<`void`\>

## Examples

**إنشاء رموز Swift في مستودع المستهلك**

```ts
import { run } from "@pantoken/cli";

// Writes Sources/PanTokens/Tokens.swift + Package.swift under ./ios/DesignTokens.
await run(["generate", "swift", "--out", "./ios/DesignTokens"]);
```

**إنشاء لوحة عينات بموضوع معين في صيغة محددة**

```ts
import { run } from "@pantoken/cli";

await run(["generate", "swatches", "--format", "gpl", "--theme", "canvas", "--out", "./out"]);
```
