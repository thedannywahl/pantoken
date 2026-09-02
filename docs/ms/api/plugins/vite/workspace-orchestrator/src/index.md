[pantoken](../../../../index.md) / workspace-orchestrator

# workspace-orchestrator

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimental</span>

`@pantoken/vite-workspace-orchestrator` — a Vite dev-server plugin that watches upstream workspace
packages and rebuilds them (and their dependents) when source changes.

During development, changes to a local workspace package normally need a manual rebuild before the
dev server reflects them. This plugin automates that: it watches each upstream package's source
with native `fs.watch` (not Vite's chokidar, which filters paths outside the project root),
debounces rapid changes, rebuilds in topological order, and registers built output with Vite's
watcher so the browser reloads. In pantoken's docs it keeps the generated CSS (`@pantoken/css`,
`@pantoken/components`) fresh as you edit the libraries, instead of only at build time.

It applies during `serve` only, so production builds are untouched.

## Contoh

```ts
import { resolve } from "node:path";
import { workspaceOrchestrator } from "@pantoken/vite-workspace-orchestrator";

workspaceOrchestrator({
  upstream: [
    {
      name: "@pantoken/components",
      dir: resolve(root, "formats/components"),
      watchPaths: [resolve(root, "formats/components/src")],
      build: ["pnpm", "run", "build"],
      dependents: [],
    },
  ],
  outputWatchPaths: [resolve(root, "formats/components/generated")],
});
```

## Antaramuka

- [UpstreamNode](interfaces/UpstreamNode.md)
- [FileServerEntry](interfaces/FileServerEntry.md)
- [OrchestratorOptions](interfaces/OrchestratorOptions.md)

## Fungsi

- [matchesFilters](functions/matchesFilters.md)
- [workspaceOrchestrator](functions/workspaceOrchestrator.md)
