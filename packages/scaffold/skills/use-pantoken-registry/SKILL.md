---
name: use-pantoken-registry
description: Use Pantoken's shadcn/ui registry to search, inspect, and add CSS-backed registry items. Use when a project has components.json, the user asks for shadcn registry items, or the user wants to browse Pantoken registry styles. Do not use as a general Pantoken app setup skill; use create-pantoken-app for non-registry package wiring.
---

# Use the Pantoken registry

Use Pantoken's shadcn/ui registry when the project already uses shadcn/ui, has `components.json`,
or the user explicitly asks for Pantoken registry items. Registry items install CSS, usage metadata,
and package dependencies; they are not React components.

If the project is not a shadcn project and the user did not ask for the registry, stop and use
`create-pantoken-app` instead.

## 1. Confirm registry fit

Use the registry only when one of these is true:

- The repo contains `components.json`.
- The user asks for shadcn, registry items, or `shadcn add`.
- The task is to inspect Pantoken registry metadata.

If the user needs full interactive React components, use `@instructure/ui-*` packages. Pantoken's
registry provides CSS-backed styles and metadata, not component implementations.

## 2. Use the project runner

Detect the package manager from lockfiles and substitute its runner for `npx`:

| Lockfile found             | Runner          |
| -------------------------- | --------------- |
| `pnpm-lock.yaml`           | `pnpm dlx`      |
| `yarn.lock`                | `yarn dlx`      |
| `bun.lock`/`bun.lockb`     | `bunx`          |
| `deno.lock`                | `deno run npm:` |
| `package-lock.json` / none | `npx`           |

## 3. Search, inspect, add

Prefer the shadcn CLI for live registry operations:

```sh
npx shadcn@latest search @pantoken --query <need>
npx shadcn@latest view @pantoken/<item>
npx shadcn@latest add @pantoken/<item>
```

For URL-capable agents, fetch the manifest first when you need to browse available entries:

```text
https://pantoken.app/r/registry.json
```

Then inspect the item JSON before adding when the choice is not obvious:

```text
https://pantoken.app/r/<item>.json
```

## 4. Explain what changed

After adding an item, summarize:

- Which registry item was installed.
- Which files the shadcn CLI wrote or changed.
- Any dependencies the registry item added.
- That future styling should still use real `--instui-*` token names and `var(--instui-*)`
  references rather than invented token names.

If the registry item does not satisfy the task, fall back to the normal package guidance in
`create-pantoken-app` and explain why the registry path was not enough.
