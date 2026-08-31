[pantoken](../../../../index.md) / [ai/pantoken-ai/src](../index.md) / installAgentAssets

# Function: installAgentAssets()

> **installAgentAssets**(`tool`, `dir?`): `string`[]

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

اكتب موارد وكيل pantoken لأداة إلى مستودع المستهلك.

## Parameters

### tool

[`AgentTool`](../type-aliases/AgentTool.md) \| `"all"`

أداة وكيل محددة [AgentTool](../type-aliases/AgentTool.md)، أو `"all"` لكل مورد.

### dir?

`string` = `"."`

الدليل المستهدف (الافتراضي `"."`).

## Returns

`string`[]

المسارات المكتوبة.

## Examples

**تثبيت موارد أداة واحدة في مستودع**

```ts
import { installAgentAssets } from "@pantoken/ai";

const written = installAgentAssets("cursor", "./my-app");
// → ["my-app/.cursor/rules/pantoken.mdc"]
```

**تثبيت كل مورد في المجلد الحالي**

```ts
import { installAgentAssets } from "@pantoken/ai";

installAgentAssets("all");
// writes AGENTS.md, llms.txt, and the Cursor/Copilot/Windsurf/Claude assets
```
