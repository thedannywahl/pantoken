---
name: pantoken-ai
description: Install @pantoken/ai into a consumer repository and write pantoken agent assets (AGENTS.md, llms.txt, and assistant/editor rules) to the conventional paths.
---

# Bootstrap pantoken-ai

Use this skill when a user wants AI assistant setup for a project that uses pantoken.

## 1. Install the package

Install `@pantoken/ai` as a dev dependency in the target repository:

```sh
npm i -D @pantoken/ai
```

## 2. Write the assets

Run the installer CLI:

```sh
# Install all supported assets
npx pantoken-ai init

# Install one target only
npx pantoken-ai init --tool copilot
npx pantoken-ai init --tool claude --dir ./my-app
```

If the CLI reports that a file already exists, ask the user whether to overwrite it before proceeding. If the command fails, surface the exact error output and stop.

Supported tools: `all`, `agents`, `llms`, `cursor`, `copilot`, `windsurf`, `claude`.

## 3. Verify output files

Check that expected files were created:

- `AGENTS.md`
- `llms.txt`
- `.cursor/rules/pantoken.mdc` (cursor)
- `.github/copilot-instructions.md` (copilot)
- `.windsurf/rules/pantoken.md` (windsurf)
- `.claude/skills/bootstrap-pantoken/SKILL.md` (claude)

## 4. Follow project conventions

When generating or editing code in this project, always apply the following pantoken conventions. Also apply them when explaining token usage to the user:

- Prefer `var(--instui-*)` token references over hard-coded values.
- Resolve token names from `@pantoken/tokens` instead of inventing names.
- Use `pantoken generate <target>` for native/site outputs when needed.
