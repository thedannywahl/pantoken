[pantoken](../../../../index.md) / [ai/pantoken-ai/src](../index.md) / installAgentAssets

# Funció: installAgentAssets()

> **installAgentAssets**(`tool`, `dir?`): `string`[]

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

Escriu els actius d'agent de pantoken per a una eina en un repositori de consumidor.

## Paràmetres

### tool

[`AgentTool`](../type-aliases/AgentTool.md) \| `"all"`

Una [AgentTool](../type-aliases/AgentTool.md) específica, o `"all"` per a cada actiu.

### dir?

`string` = `"."`

El directori destí (per defecte `"."`).

## Retorna

`string`[]

Els camins escrits.

## Exemples

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
