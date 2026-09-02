[pantoken](../../../../index.md) / [ai/pantoken-ai/src](../index.md) / scaffoldAndInit

# Funktion: scaffoldAndInit()

> **scaffoldAndInit**(`platform`, `dir?`, `tool?`): `Promise`\<`string`[]\>

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Stil et starterproject for en platform op (via `@pantoken/scaffold`), og installér panto tokens
agent-aktiver (via [installAgentAssets](installAgentAssets.md)) i samme mappe.

## Parametre

### platform

`string`

En [ScaffoldPlatform](../type-aliases/ScaffoldPlatform.md).

### dir?

`string` = `"."`

Målmappen (standard `"."`). Dens basename (eller `"pantoken-app"` for `"."`)
  erstattes af `{{projectName}}` i stilladsets skabelonfiler.

### tool?

[`AgentTool`](../type-aliases/AgentTool.md) \| `"all"`

Hvilke agent-værktøjs aktiver skal installeres sammen med stilladset (standard `"all"`).

## Returnerer

`Promise`\<`string`[]\>

De skrevne stier, stilladsets filer først.

## Eksempel

**Stil en React-starter op med hvert agent-aktiv installeret**

```ts
import { scaffoldAndInit } from "@pantoken/ai";

scaffoldAndInit("react", "./my-app");
```
