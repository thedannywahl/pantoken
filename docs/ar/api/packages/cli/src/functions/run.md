[pantoken](../../../../index.md) / [packages/cli/src](../index.md) / run

# دالة: run()

> **run**(`argv`): `Promise`\<`void`\>

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

شغّل واجهة سطر الأوامر.

## المعلمات

### argv

للقراءة فقط `string`[]

## القيم المرجعة

`Promise`\<`void`\>

## أمثلة

**توليد رموز Swift داخل مستودع المستهلك**

```ts
import { run } from "@pantoken/cli";

// Writes Sources/PanTokens/Tokens.swift + Package.swift under ./ios/DesignTokens.
await run(["generate", "swift", "--out", "./ios/DesignTokens"]);
```

**توليد لوحة عينات ألوان ذات طابع محدد بصيغة معينة**

```ts
import { run } from "@pantoken/cli";

await run(["generate", "swatches", "--format", "gpl", "--theme", "canvas", "--out", "./out"]);
```
