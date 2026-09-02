[pantoken](../../../../index.md) / workspace-orchestrator

# workspace-orchestrator

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/vite-workspace-orchestrator` — un complement de servidor dev de Vite que vigila els paquets de l'espai de treball ascendent i els reconstrueix (i les seves dependents) quan canvia la font.

Durant el desenvolupament, els canvis en un paquet d'espai de treball local normalment necessiten una reconstrucció manual abans que el servidor dev els reflecteixi. Aquest complement automatitza això: vigila la font de cada paquet ascendent amb `fs.watch` nativa (no chokidar de Vite, que filtra camins fora de l'arrel del projecte), rebota canvis ràpids, reconstrueix en ordre topològic i registra la sortida construïda amb l'observador de Vite perquè el navegador es recarregui. En la documentació de pantoken, manté frescos els CSS generats (`@pantoken/css`, `@pantoken/components`) mentre editeu les biblioteques, en lloc de només en el moment de la construcció.

S'aplica només durant `serve`, de manera que les compilacions de producció no es veuen afectades.

## Exemple

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

## Interfícies

- [UpstreamNode](interfaces/UpstreamNode.md)
- [FileServerEntry](interfaces/FileServerEntry.md)
- [OrchestratorOptions](interfaces/OrchestratorOptions.md)

## Funcions

- [matchesFilters](functions/matchesFilters.md)
- [workspaceOrchestrator](functions/workspaceOrchestrator.md)
