[pantoken](../../../../index.md) / workspace-orchestrator

# workspace-orchestrator

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

`@pantoken/vite-workspace-orchestrator` — et Vite dev-server plugin, der overvåger upstream workspace-pakker og genopbygger dem (og deres afhængigheder), når kilden ændres.

Under udvikling kræver ændringer af en lokal workspace-pakke normalt en manuel genopbygning, før dev-serveren reflekterer dem. Dette plugin automatiserer det: det overvåger hver upstream-pakkes kildefiler med systembunden `fs.watch` (ikke Vite's chokidar, som filtrerer stier uden for projektroden), dæmper hurtige ændringer, genopbygger i topologisk rækkefølge og registrerer det byggede output med Vite's watcher, så browseren genindlæses. I pantoken's docs holder det det genererede CSS (`@pantoken/css`, `@pantoken/components`) frisk, når du redigerer bibliotekerne, i stedet for kun ved byggetid.

Det anvendes kun under `serve`, så produktionbyggeri påvirkes ikke.

## Eksempel

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

## Interfaces

- [UpstreamNode](interfaces/UpstreamNode.md)
- [FileServerEntry](interfaces/FileServerEntry.md)
- [OrchestratorOptions](interfaces/OrchestratorOptions.md)

## Funktioner

- [matchesFilters](functions/matchesFilters.md)
- [workspaceOrchestrator](functions/workspaceOrchestrator.md)
