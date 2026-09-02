[pantoken](../../../../../index.md) / [plugins/vite/workspace-orchestrator/src](../index.md) / OrchestratorOptions

# Ինտերֆեյս: OrchestratorOptions

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

[workspaceOrchestrator](../functions/workspaceOrchestrator.md)-ի ընտրանքներ:

## Առանձնահատկություններ

### upstream

> **upstream**: readonly [`UpstreamNode`](UpstreamNode.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Վերևի workspace կախվածության գրաֆիկ:

***

### outputWatchPaths?

> `optional` **outputWatchPaths?**: readonly `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Ուղիներ, որոնց հետևել native `fs.watch`-ով, որպեսզի Vite-ը վերականգնի կառուցված արդյունքը վերևի վերակառուցումից հետո
(օր. փաթեթի `dist` կամ `generated` directory): Օգտագործում է native `fs.watch`-ը, ոչ
chokidar-ի `add()`-ը, որը հուսալիորեն չի հայտնաբերում փոփոխությունները pnpm-symlinked կամ արմատից դուրս
դիրեկտորիաներում: Յուրաքանչյուր փոփոխության վրա սինթետիկ `"change"` իրադարձություն արտանետվում է `server.watcher`-ի վրա՝ CSS ֆայլերի համար, որոնք արդեն module graph-ում են, Vite-ը գործարկում է ուղղորդված hot-update; ցանկացած այլ բանի համար ամբողջ page reload-ի վրա ընկնում:

***

### debounceMs?

> `optional` **debounceMs?**: `number`

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Debounce հապաղում միլիվայրկյաններով վերակառուցում գործարկելուց առաջ (լռելյայն՝ 200):

***

### fileServers?

> `optional` **fileServers?**: readonly [`FileServerEntry`](FileServerEntry.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Ընտրովի static file-serving middleware մուտքեր:
