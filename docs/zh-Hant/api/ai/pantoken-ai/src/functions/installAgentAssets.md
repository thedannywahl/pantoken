[pantoken](../../../../index.md) / [ai/pantoken-ai/src](../index.md) / installAgentAssets

# 函式: installAgentAssets()

> **installAgentAssets**(`tool`, `dir?`): `string`[]

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha（內測）</span>

Write pantoken's agent assets for a tool into a consumer repo.

## 參數

### tool

[`AgentTool`](../type-aliases/AgentTool.md) \| `"all"`

A specific [AgentTool](../type-aliases/AgentTool.md), or `"all"` for every asset.

### dir?

`string` = `"."`

The target directory (default `"."`).

## 回傳

`string`[]

The paths written.

## 範例

**Install one tool's assets into a repo**

```ts
import { installAgentAssets } from "@pantoken/ai";

const written = installAgentAssets("cursor", "./my-app");
// → ["my-app/.cursor/rules/pantoken.mdc"]
```

**Install every asset into the current directory**

```ts
import { installAgentAssets } from "@pantoken/ai";

installAgentAssets("all");
// writes AGENTS.md, llms.txt, and the Cursor/Copilot/Windsurf/Claude assets
```
