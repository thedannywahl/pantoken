[pantoken](../../../../index.md) / [ai/pantoken-ai/src](../index.md) / scaffoldAndInit

# Function: scaffoldAndInit()

> **scaffoldAndInit**(`platform`, `dir?`, `tool?`): `Promise`\<`string`[]\>

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Estableix un projecte inicial per a una plataforma (via `@pantoken/scaffold`), i instal·la els
actius d'agent de pantoken (via [installAgentAssets](installAgentAssets.md)) al mateix directori.

## Parameters

### platform

`string`

Una [ScaffoldPlatform](../type-aliases/ScaffoldPlatform.md).

### dir?

`string` = `"."`

El directori destí (per defecte `"."`). El seu nom base (o `"pantoken-app"` per a `"."`)
es substitueix per `{{projectName}}` als fitxers de plantilla de l'estructura.

### tool?

[`AgentTool`](../type-aliases/AgentTool.md) \| `"all"`

Quins actius de l'eina d'agent s'instal·len junt amb l'estructura (per defecte `"all"`).

## Returns

`Promise`\<`string`[]\>

Els camins escrits, primer els fitxers d'estructura.

## Example

**Estableix un inici de React amb cada actiu d'agent instal·lat**

```ts
import { scaffoldAndInit } from "@pantoken/ai";

scaffoldAndInit("react", "./my-app");
```
