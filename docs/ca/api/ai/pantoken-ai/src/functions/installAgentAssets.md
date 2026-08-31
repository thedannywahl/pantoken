[pantoken](../../../../index.md) / [ai/pantoken-ai/src](../index.md) / installAgentAssets

# Function: installAgentAssets()

> **installAgentAssets**(`tool`, `dir?`): `string`[]

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Escriu els actius d'agent de pantoken per a una eina en un repositori de consumidor.

## Parameters

### tool

[`AgentTool`](../type-aliases/AgentTool.md) \| `"all"`

Una [AgentTool](../type-aliases/AgentTool.md) específica, o `"all"` per a cada actiu.

### dir?

`string` = `"."`

El directori destí (per defecte `"."`).

## Returns

`string`[]

Els camins escrits.

## Examples

**Instal·la els actius d'una eina en un repositori**

```ts
import { installAgentAssets } from "@pantoken/ai";

const written = installAgentAssets("cursor", "./my-app");
// → ["my-app/.cursor/rules/pantoken.mdc"]
```

**Instal·la cada actiu al directori actual**

```ts
import { installAgentAssets } from "@pantoken/ai";

installAgentAssets("all");
// writes AGENTS.md, llms.txt, and the Cursor/Copilot/Windsurf/Claude assets
```
