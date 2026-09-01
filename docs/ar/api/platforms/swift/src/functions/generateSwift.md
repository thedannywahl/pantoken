[pantoken](../../../../index.md) / [platforms/swift/src](../index.md) / generateSwift

# دالة: generateSwift()

> **generateSwift**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

توليد Swift لنمط مسمّى (باستخدام IR المُدرج المُباعِر `@pantoken/tokens`).

## المعلمات

### options

[`GenerateSwiftOptions`](../interfaces/GenerateSwiftOptions.md)

## القيم المرجعة

`Promise`\<`string`\>

مسار ملف Swift المكتوب.

## مثال

```ts
import { generateSwift } from "@pantoken/swift";

const file = await generateSwift({
  outDir: "./Sources/Tokens",
  theme: "rebrand",
  className: "PanTokens",
  icons: ["add", "check"], // optional: also emit an Icons.xcassets catalog
});
```
