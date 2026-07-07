# @pantoken/ai

Agent assets for projects that use pantoken (not for developing pantoken itself). It ships an
`AGENTS.md`, an `llms.txt`, editor and agent rule files (Cursor, Copilot, Windsurf), and a Claude
Code bootstrap skill — plus an installer CLI that drops them into a consumer repo at the conventional
paths.

## Install

```sh
npm i -D @pantoken/ai
```

## Usage

Run the installer to write the assets into a repo:

```sh
# Everything (AGENTS.md, llms.txt, Cursor, Copilot, Windsurf, Claude skill):
npx pantoken-ai init

# One tool:
npx pantoken-ai init --tool cursor
npx pantoken-ai init --tool claude --dir ./my-app
```

Tools: `agents`, `llms`, `cursor`, `copilot`, `windsurf`, `claude`, or `all`.

Or install programmatically:

```ts
import { installAgentAssets, AGENTS_MD, LLMS_TXT } from "@pantoken/ai";

installAgentAssets("cursor", "./my-app"); // → .cursor/rules/pantoken.mdc
```

The assets teach an agent how to consume pantoken: the token model (`--instui-*`), which package to
reach for per framework and platform, the `pantoken generate <target>` CLI, and the conventions
(prefer `var(--instui-*)` references, never invent token names).

## API

- **`installAgentAssets(tool, dir?): string[]`** — write pantoken's agent assets for a tool into a
  consumer repo. `tool` is a specific `AgentTool` or `"all"`; `dir` defaults to `"."`. Returns the
  paths written.
- **`AGENT_TOOLS: readonly AgentTool[]`** — every installable tool key.
- **`AgentTool`** — the tool union: `"agents"`, `"llms"`, `"cursor"`, `"copilot"`, `"windsurf"`, and
  `"claude"`.
- **`AGENTS_MD`, `LLMS_TXT`** — the `AGENTS.md` and `llms.txt` contents as strings.
- **`ASSETS`** — the raw asset map (re-exported from the generated assets module).

## License

MIT
