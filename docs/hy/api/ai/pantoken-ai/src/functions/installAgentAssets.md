[pantoken](../../../../index.md) / [ai/pantoken-ai/src](../index.md) / installAgentAssets

# Ֆունկցիա: installAgentAssets()

> **installAgentAssets**(`tool`, `dir?`): `string`[]

<span class="instui-pill -color-warning pantoken-doc-tag">Ալֆա</span>

Գրել pantoken-ի գործակալի ակտիվներ գործիքի համար սպառողական շամ:

## Պարամետրեր

### tool

[`AgentTool`](../type-aliases/AgentTool.md) \| `"all"`

Հատուկ [AgentTool](../type-aliases/AgentTool.md) կամ `"all"` յուրաքանչյուր ակտիվի համար:

### dir?

`string` = `"."`

Նպատակային թղթապանակ (լռելյայն `"."`):

## Վերադարձվող արժեք

`string`[]

Գրված ուղիները:

## Օրինակներ

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
