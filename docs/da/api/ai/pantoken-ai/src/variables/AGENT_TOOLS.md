[pantoken](../../../../index.md) / [ai/pantoken-ai/src](../index.md) / AGENT\_TOOLS

# Variable: AGENT\_TOOLS

> `const` **AGENT\_TOOLS**: readonly [`AgentTool`](../type-aliases/AgentTool.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Hver installérbar værktøjsnøgle.

## Example

**Installér hvert værktøj individuelt**

```ts
import { AGENT_TOOLS, installAgentAssets } from "@pantoken/ai";

for (const tool of AGENT_TOOLS) installAgentAssets(tool, "./my-app");
```
