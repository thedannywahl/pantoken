[pantoken](../../../../../index.md) / [plugins/vite/workspace-orchestrator/src](../index.md) / OrchestratorOptions

# इंटरफेस: OrchestratorOptions

<span class="instui-pill -color-danger pantoken-doc-tag">प्रयोगात्मक</span>

Options for [workspaceOrchestrator](../functions/workspaceOrchestrator.md).

## प्रॉपर्टीज

### upstream

> **upstream**: readonly [`UpstreamNode`](UpstreamNode.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">प्रयोगात्मक</span>

The upstream workspace dependency graph.

***

### outputWatchPaths?

> `optional` **outputWatchPaths?**: readonly `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">प्रयोगात्मक</span>

Paths to watch with native `fs.watch` so Vite picks up built output after an upstream rebuild
(e.g. a package's `dist` or `generated` directory). Uses native `fs.watch` rather than
chokidar's `add()`, which doesn't reliably detect changes in pnpm-symlinked or out-of-root
directories. On each change a synthetic `"change"` event is emitted on `server.watcher`: for
CSS files already in the module graph Vite triggers a targeted hot-update; for anything else
it falls back to a full page reload.

***

### debounceMs?

> `optional` **debounceMs?**: `number`

<span class="instui-pill -color-danger pantoken-doc-tag">प्रयोगात्मक</span>

Debounce delay in milliseconds before triggering a rebuild (default: 200).

***

### fileServers?

> `optional` **fileServers?**: readonly [`FileServerEntry`](FileServerEntry.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">प्रयोगात्मक</span>

Optional static file-serving middleware entries.
