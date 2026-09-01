[pantoken](../../../../index.md) / [ai/pantoken-ai/src](../index.md) / AGENT\_TOOLS

# متغير: AGENT\_TOOLS

> `const` **AGENT\_TOOLS**: readonly [`AgentTool`](../type-aliases/AgentTool.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

كل مفتاح أداة قابل للتثبيت.

## مثال

**قم بتثبيت كل أداة بشكل فردي**

```ts
import { AGENT_TOOLS, installAgentAssets } from "@pantoken/ai";

for (const tool of AGENT_TOOLS) installAgentAssets(tool, "./my-app");
```
