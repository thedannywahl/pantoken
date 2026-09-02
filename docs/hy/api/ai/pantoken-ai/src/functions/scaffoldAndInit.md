[pantoken](../../../../index.md) / [ai/pantoken-ai/src](../index.md) / scaffoldAndInit

# Ֆունկցիա: scaffoldAndInit()

> **scaffoldAndInit**(`platform`, `dir?`, `tool?`): `Promise`\<`string`[]\>

<span class="instui-pill -color-warning pantoken-doc-tag">Ալֆա</span>

Կազմել ստացող նախագիծ հարթակի համար (via `@pantoken/scaffold`), և տեղադրել pantoken-ի
գործակալի ակտիվներ (via [installAgentAssets](installAgentAssets.md)) նույն թղթապանակ:

## Պարամետրեր

### platform

`string`

[ScaffoldPlatform](../type-aliases/ScaffoldPlatform.md):

### dir?

`string` = `"."`

Նպատակային թղթապանակ (լռելյայն `"."`): Դրա բազային անունը (կամ `"pantoken-app"` համար `"."`)
  փոխարինվել է `{{projectName}}`-ի համար scaffolding-ի ձևանմուշ ֆայլերում:

### tool?

[`AgentTool`](../type-aliases/AgentTool.md) \| `"all"`

Որ գործակալի գործիքի ակտիվները տեղադրել scaffolding-ի հետ (լռելյայն `"all"`):

## Վերադարձվող արժեք

`Promise`\<`string`[]\>

Գրված ուղիները, scaffolding ֆայլերը նախ:

## Օրինակ

**Կազմել React ստացողը բոլոր գործակալի ակտիվներ տեղադրված:**

```ts
import { scaffoldAndInit } from "@pantoken/ai";

scaffoldAndInit("react", "./my-app");
```
