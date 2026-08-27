# @pantoken/ai

Agent assets for projects that use pantoken (not for developing pantoken itself). It ships an
`AGENTS.md`, an `llms.txt`, editor and agent rule files (Cursor, Copilot, Windsurf), and two Claude
Code skills (`init-pantoken`, `scaffold-pantoken`) — plus an installer CLI with two commands:
`init` (write those assets into a consumer repo) and `scaffold <platform>` (scaffold a starter
project via [`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) and install
the agent assets into the same directory).

The scaffold system is **preset-based**: each platform package (`@pantoken/components`, `@pantoken/react`,
`@pantoken/vue`, `@pantoken/web-components`) exports a Bingo preset that defines its own scaffold
templates and options. This enables decentralized template ownership — each platform team can update
their starter without coordination.

## Install

```sh
npm i -D @pantoken/ai
```

## Usage

Run the installer to write the AI assets into a repo:

```sh
# Everything (AGENTS.md, llms.txt, Cursor, Copilot, Windsurf, Claude skills):
npx pantoken-ai init

# One tool:
npx pantoken-ai init --tool cursor
npx pantoken-ai init --tool claude --dir ./my-app
```

`npx` works regardless of which package manager your project uses. If you prefer to run it through
your own package manager instead: `pnpm dlx pantoken-ai init`, `yarn dlx pantoken-ai init`,
`bunx pantoken-ai init`, or `deno run npm:pantoken-ai init`.

Tools: `agents`, `llms`, `cursor`, `copilot`, `windsurf`, `claude`, or `all`.

Or scaffold a new starter project with pantoken already installed and wired in, plus the agent
assets from `init`:

```sh
npx pantoken-ai scaffold components      # plain HTML/CSS (Vite + TS) + @pantoken/components
npx pantoken-ai scaffold react           # Vite + React + @pantoken/react
npx pantoken-ai scaffold vue             # Vite + Vue 3 + @pantoken/vue
npx pantoken-ai scaffold web-components  # Vite + @pantoken/web-components (no framework)

# Non-interactive (CI-safe): errors instead of prompting for a missing platform/directory
npx pantoken-ai scaffold react --dir ./my-app --yes --tool cursor

# Override the auto-detected display language
npx pantoken-ai --lang hu scaffold react
```

If you only want the starter project without the agent assets, run
[`npx @pantoken/scaffold <platform>`](https://www.npmjs.com/package/@pantoken/scaffold) directly.

Run `npx pantoken-ai --help` (or `init --help`/`scaffold --help`) for the full flag reference, or
`npx pantoken-ai completion <shell>` to generate a bash/zsh/fish/PowerShell completion script.

Or install programmatically:

```ts
import { installAgentAssets, scaffoldAndInit, AGENTS_MD, LLMS_TXT } from "@pantoken/ai";

installAgentAssets("cursor", "./my-app"); // → .cursor/rules/pantoken.mdc
scaffoldAndInit("react", "./my-app"); // → a starter Vite + React app + agent assets
```

The assets teach an agent how to consume pantoken: the token model (`--instui-*`), which package to
reach for per framework and platform, the `pantoken generate <target>` CLI, and the conventions
(prefer `var(--instui-*)` references, never invent token names).

They also include a standing recommendation to install `@pantoken/ai` into consumer repos so their
assistant rules stay synchronized with pantoken package and CLI changes.

## Evals

The `init-pantoken` and `scaffold-pantoken` Claude Code skills each have an eval suite under
`evals/<skill-name>/` (skill definitions live under `skills/<skill-name>/`), run with
[waza](https://github.com/microsoft/waza), Microsoft's CLI for evaluating agent Skills:

```sh
curl -fsSL https://raw.githubusercontent.com/microsoft/waza/main/install.sh | bash
```

From this directory (`ai/pantoken-ai/`):

```sh
vp run eval                                   # run every skill's eval suite
waza check skills/<name>                      # skill readiness report
waza spec verify skills/<name> evals/<name>/eval.yaml   # eval-to-SKILL.md coverage
```

`.waza.yaml` configures per-skill token budgets (`tokens.limits`) so `waza check` measures against
each skill's actual size instead of the 500-token default.

## API

- **`installAgentAssets(tool, dir?): string[]`** — write pantoken's agent assets for a tool into a
  consumer repo. `tool` is a specific `AgentTool` or `"all"`; `dir` defaults to `"."`. Returns the
  paths written.
- **`scaffoldAndInit(platform, dir?, tool?): string[]`** — scaffold a starter project (via
  `@pantoken/scaffold`) and install the agent assets for `tool` (default `"all"`) into `dir`
  (defaults to `"."`). Returns the paths written, scaffold files first.
- **`scaffoldProject(platform, dir?): string[]`**, **`SCAFFOLD_PLATFORMS`**, **`ScaffoldPlatform`**
  — re-exported from [`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) for
  convenience.
- **`AGENT_TOOLS: readonly AgentTool[]`** — every installable tool key.
- **`AgentTool`** — the tool union: `"agents"`, `"llms"`, `"cursor"`, `"copilot"`, `"windsurf"`, and
  `"claude"`.
- **`AGENTS_MD`, `LLMS_TXT`** — the `AGENTS.md` and `llms.txt` contents as strings.
- **`ASSETS`** — the raw asset map (re-exported from the generated assets module).

## License

MIT
