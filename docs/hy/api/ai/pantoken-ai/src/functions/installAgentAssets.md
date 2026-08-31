[pantoken](../../../../index.md) / [ai/pantoken-ai/src](../index.md) / installAgentAssets

# Function: installAgentAssets()

> **installAgentAssets**(`tool`, `dir?`): `string`[]

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Գրել pantoken-ի գործակալի ակտիվներ գործիքի համար սպառողական շամ:

## Parameters

### tool

[`AgentTool`](../type-aliases/AgentTool.md) \| `"all"`

Հատուկ [AgentTool](../type-aliases/AgentTool.md) կամ `"all"` յուրաքանչյուր ակտիվի համար:

### dir?

`string` = `"."`

Նպատակային թղթապանակ (լռելյայն `"."`):

## Returns

`string`[]

Գրված ուղիները:

## Examples

**Տեղադրել մեկ գործիքի ակտիվներ շամ:**

```ts
import { installAgentAssets } from "@pantoken/ai";

const written = installAgentAssets("cursor", "./my-app");
// → ["my-app/.cursor/rules/pantoken.mdc"]
```

**Տեղադրել բոլոր ակտիվներ ընթացիկ թղթապանակ:**

```ts
import { installAgentAssets } from "@pantoken/ai";

installAgentAssets("all");
// writes AGENTS.md, llms.txt, and the Cursor/Copilot/Windsurf/Claude assets
```
