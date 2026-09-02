[pantoken](../../../../index.md) / [ai/pantoken-ai/src](../index.md) / installAgentAssets

# دالة: installAgentAssets()

> **installAgentAssets**(`tool`, `dir?`): `string`[]

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

اكتب أصول وكلاء pantoken لأداة داخل مستودع المستهلك.

## المعلمات

### tool

[`AgentTool`](../type-aliases/AgentTool.md) \| `"all"`

أداة محددة [AgentTool](../type-aliases/AgentTool.md)، أو `"all"` لكل أصل.

### dir?

`string` = `"."`

دليل الهدف (الافتراضي `"."`).

## القيم المرجعة

`string`[]

المسارات المكتوبة.

## أمثلة

**تثبيت أصول أداة واحدة في مستودع**

```ts
import { installAgentAssets } from "@pantoken/ai";

const written = installAgentAssets("cursor", "./my-app");
// → ["my-app/.cursor/rules/pantoken.mdc"]
```

**تثبيت كل الأصول في الدليل الحالي**

```ts
import { installAgentAssets } from "@pantoken/ai";

installAgentAssets("all");
// writes AGENTS.md, llms.txt, and the Cursor/Copilot/Windsurf/Claude assets
```
