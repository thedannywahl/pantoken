[pantoken](../../../../../index.md) / [plugins/vite/workspace-orchestrator/src](../index.md) / OrchestratorOptions

# Interface: OrchestratorOptions

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Muligheder for [workspaceOrchestrator](../functions/workspaceOrchestrator.md).

## Egenskaber

### upstream

> **upstream**: readonly [`UpstreamNode`](UpstreamNode.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Den upstream workspace-afhængighedsgraf.

***

### outputWatchPaths?

> `optional` **outputWatchPaths?**: readonly `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Stier til at overvåge med systembunden `fs.watch` så Vite opsamler bygget output efter en upstream genopbygning
(f.eks. en pakkes `dist` eller `generated` katalog). Bruger systembunden `fs.watch` i stedet for
chokidars `add()`, som ikke pålideligt detekterer ændringer i pnpm-symlinked eller uden-for-rod kataloger. Ved hver ændring emitteres en syntetisk `"change"` hændelse på `server.watcher`: for CSS-filer allerede i modulgrafen udløser Vite en målrettet hot-update; for alt andet falder det tilbage til en fuld sidegenindlæsning.

***

### debounceMs?

> `optional` **debounceMs?**: `number`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Dæmpningsforsinkelse i millisekunder før udløsning af en genopbygning (standard: 200).

***

### fileServers?

> `optional` **fileServers?**: readonly [`FileServerEntry`](FileServerEntry.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Valgfrie statiske filserveringsmiddelware-indgange.
