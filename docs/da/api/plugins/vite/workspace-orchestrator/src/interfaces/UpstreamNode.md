[pantoken](../../../../../index.md) / [plugins/vite/workspace-orchestrator/src](../index.md) / UpstreamNode

# Interface: UpstreamNode

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

En upstream workspace-pakke til at overvåge og genopbygge.

## Egenskaber

### name

> **name**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Visningsnavn for logbeskeder.

***

### dir

> **dir**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Pakkerodkatolog (cwd for byggekommandoen).

***

### watchPaths

> **watchPaths**: `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Stier (filer eller kataloger) til at overvåge — kataloger overvåges rekursivt.

***

### build

> **build**: readonly \[`string`, `string`\]

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Byggekommando: første element er den eksekverbare, resten er argumenter.

***

### dependents

> **dependents**: readonly `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Navne på andre upstream-knuder, der skal genopbygges efter denne lykkes.

***

### include?

> `optional` **include?**: readonly `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Glob-mønstre for filer, der skal inkluderes. Når det er indstillet, udløser kun ændringer af filer, der matcher mindst ét mønster, en genopbygning. Udelad for at inkludere alt.

***

### ignore?

> `optional` **ignore?**: readonly `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Glob-mønstre for filer, der skal ignoreres. Ændringer af matchende filer springes stilfærdigt over. Udelad for ikke at ignorere noget.
