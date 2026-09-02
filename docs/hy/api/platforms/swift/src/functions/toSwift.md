[pantoken](../../../../index.md) / [platforms/swift/src](../index.md) / toSwift

# Ֆունկցիա: toSwift()

> **toSwift**(`tokens`, `options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Արտանետել Swift բացահայտ թոկեն IR-ի համար:

## Պարամետրեր

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

### options

[`GenerateSwiftOptions`](../interfaces/GenerateSwiftOptions.md)

## Վերադարձվող արժեք

`Promise`\<`string`\>

Գրված Swift ֆայլի ուղին:

## Օրինակներ

**Արտածել կոնկրետ թեմայի IR**

```ts
import { toSwift } from "@pantoken/swift";
import { byTheme } from "@pantoken/tokens";

const file = await toSwift(byTheme("canvas"), { outDir: "./Sources/Tokens" });
// writes Tokens.swift (class PanTokens { … })
```

**Մուգ ռեժիմ հատուկ դասի անունով և ակտիվ կատալոգով**

```ts
import { toSwift } from "@pantoken/swift";
import { byTheme } from "@pantoken/tokens";

await toSwift(byTheme("rebrand"), {
  outDir: "./Sources/Tokens",
  mode: "dark",
  className: "InstUITokens",
  icons: ["add", "check"], // also emits Icons.xcassets
});
```
