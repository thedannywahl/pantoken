[pantoken](../../../../index.md) / [platforms/compose/src](../index.md) / toCompose

# Ֆունկցիա: toCompose()

> **toCompose**(`tokens`, `options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Արտանետել Compose Kotlin հստակ token IR-ի համար: Վերադարձնում է գրված ֆայլի ճանապարհ:

## Պարամետրեր

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

### options

[`GenerateComposeOptions`](../interfaces/GenerateComposeOptions.md)

## Վերադարձվող արժեք

`Promise`\<`string`\>

## Օրինակներ

**Արտածել կոնկրետ թեմայի IR**

```ts
import { toCompose } from "@pantoken/compose";
import { byTheme } from "@pantoken/tokens";

const file = await toCompose(byTheme("canvas"), { outDir: "./ui/tokens" });
// writes ./ui/tokens/PanTokens.kt (object PanTokens { … })
```

**Մութ ռեժիմ՝ հատուկ օբյեկտի անունով**

```ts
import { toCompose } from "@pantoken/compose";
import { byTheme } from "@pantoken/tokens";

await toCompose(byTheme("rebrand"), {
  outDir: "./ui/tokens",
  mode: "dark",
  className: "InstUITokens", // writes InstUITokens.kt
});
```
