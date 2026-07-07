# @pantoken/vite-workspace-orchestrator

A Vite dev-server plugin that watches upstream workspace packages and rebuilds them (and their
dependents) when source changes.

When an app depends on local workspace packages, changes to those packages normally need a manual
rebuild before the dev server reflects them. This plugin automates that: it watches each upstream
package's source, rebuilds in topological order, and registers the built output with Vite's watcher
so the browser reloads. It applies during `serve` only — production builds are untouched.

Key behaviors:

- Watches with native `fs.watch`, not Vite's chokidar, so paths outside the project root aren't
  filtered out.
- Debounces rapid changes per package before spawning a build.
- Rebuilds dependents in topological order after a successful build.
- Registers optional HMR paths with Vite's watcher, and mounts optional static file servers.

## Usage

```ts
import { resolve } from "node:path";
import { workspaceOrchestrator } from "@pantoken/vite-workspace-orchestrator";

export default {
  plugins: [
    workspaceOrchestrator({
      upstream: [
        {
          name: "@pantoken/components",
          dir: resolve(root, "formats/components"),
          watchPaths: [resolve(root, "formats/components/src")],
          build: ["pnpm", "exec", "vp", "run", "@pantoken/components#build"],
          dependents: [],
        },
      ],
      hmrWatchPaths: [resolve(root, "formats/components/generated")],
      debounceMs: 200,
    }),
  ],
};
```

pantoken's docs site wires it in `docs/.vitepress/config.ts` so edits to `@pantoken/css` and
`@pantoken/components` rebuild live during `docs:dev` instead of only at the next full build.

## API

- **`workspaceOrchestrator(options)`** — returns a Vite plugin (`apply: "serve"`).
- **`matchesFilters(filename, node)`** — the include/ignore predicate, exported for testing.
- **`OrchestratorOptions`**, **`UpstreamNode`**, **`FileServerEntry`** — the option types.
