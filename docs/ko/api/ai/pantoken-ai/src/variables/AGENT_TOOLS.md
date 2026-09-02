[pantoken](../../../../index.md) / [ai/pantoken-ai/src](../index.md) / AGENT\_TOOLS

# 변수: AGENT\_TOOLS

> `const` **AGENT\_TOOLS**: readonly [`AgentTool`](../type-aliases/AgentTool.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">알파</span>

Every installable tool key.

## 예제

**Install each tool individually**

```ts
import { AGENT_TOOLS, installAgentAssets } from "@pantoken/ai";

for (const tool of AGENT_TOOLS) installAgentAssets(tool, "./my-app");
```
