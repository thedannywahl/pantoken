---
name: init-pantoken
description: Install pantoken's agent assets (AGENTS.md, llms.txt, editor/agent rule files, and app/mockup skills) into this repo so AI tools know how to work with pantoken. Use when the user asks to add pantoken AI support, or wants Copilot/Cursor/Windsurf/Claude rules for pantoken set up in a repo.
---

# Init pantoken (AI assets)

Install pantoken's consumer-facing agent assets into the current repo: `AGENTS.md`, `llms.txt`,
editor/agent rule files (Cursor, Copilot, Windsurf), and the `create-pantoken-app`,
`create-pantoken-mockup`, and `use-pantoken-registry` skills.

```sh
npx pantoken-ai init
```

This installs every asset by default. To scope it to one tool, pass
`--tool <agents|llms|cursor|copilot|windsurf|claude>`. To target a directory other than the
current one, pass `--dir <path>`. Substitute `pnpm dlx`, `yarn dlx`, `bunx`, or `deno run npm:` for `npx` depending
on the package manager detected in the repo (look for `pnpm-lock.yaml`, `yarn.lock`, or
`bun.lock`/`bun.lockb`; default to npm/npx if none is found).

That's all this skill does — it only writes the asset files above, it does not install any
`@pantoken/*` package or modify application code. Once the assets are installed, use
`create-pantoken-app` for a maintained project (or run `npx pantoken-ai scaffold <platform>`
directly), use `create-pantoken-mockup` for a standalone browser or email artifact, and use
`use-pantoken-registry` when a shadcn project should search, inspect, or add Pantoken registry
items.
