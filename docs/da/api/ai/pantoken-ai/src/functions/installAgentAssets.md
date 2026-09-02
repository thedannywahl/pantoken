[pantoken](../../../../index.md) / [ai/pantoken-ai/src](../index.md) / installAgentAssets

# Funktion: installAgentAssets()

> **installAgentAssets**(`tool`, `dir?`): `string`[]

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Skriv panto tokens agent-aktiver for et værktøj til et consumer-repo.

## Parametre

### tool

[`AgentTool`](../type-aliases/AgentTool.md) \| `"all"`

Et specifikt [AgentTool](../type-aliases/AgentTool.md), eller `"all"` for hvert aktiv.

### dir?

`string` = `"."`

Målmappen (standard `"."`).

## Returnerer

`string`[]

De skrevne stier.

## Eksempler

**Installér ét værktøjs aktiver i et repo**

```ts
import { installAgentAssets } from "@pantoken/ai";

const written = installAgentAssets("cursor", "./my-app");
// → ["my-app/.cursor/rules/pantoken.mdc"]
```

**Installér hvert aktiv i den aktuelle mappe**

```ts
import { installAgentAssets } from "@pantoken/ai";

installAgentAssets("all");
// writes AGENTS.md, llms.txt, and the Cursor/Copilot/Windsurf/Claude assets
```
