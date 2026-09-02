[pantoken](../../../../../index.md) / [plugins/vite/workspace-orchestrator/src](../index.md) / OrchestratorOptions

# Interfície: OrchestratorOptions

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Opcions per a [workspaceOrchestrator](../functions/workspaceOrchestrator.md).

## Propietats

### upstream

> **upstream**: readonly [`UpstreamNode`](UpstreamNode.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

El gràfic de dependència de l'espai de treball ascendent.

***

### outputWatchPaths?

> `optional` **outputWatchPaths?**: readonly `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Camins a vigilar amb `fs.watch` nativa perquè Vite reculli la sortida construïda després d'una reconstrucció ascendent
(p. ex. el directori `dist` o `generated` d'un paquet). Utilitza `fs.watch` nativa en lloc de
`add()` de chokidar, que no detecta de manera fiable els canvis en directoris simlinked de pnpm o fora de l'arrel.
En cada canvi, es genera un event sintètic `"change"` a `server.watcher`: per als fitxers CSS ja en el gràfic de mòduls Vite activa una actualització de calor dirigida; per a qualsevol altra cosa
retorna a una recàrrega completa de la pàgina.

***

### debounceMs?

> `optional` **debounceMs?**: `number`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Retard de rebotege en mil·lisegons abans de desencadenar una reconstrucció (per defecte: 200).

***

### fileServers?

> `optional` **fileServers?**: readonly [`FileServerEntry`](FileServerEntry.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Entrades de middleware de servei de fitxers estàtics opcionals.
