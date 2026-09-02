[pantoken](../../../../../index.md) / [plugins/vite/workspace-orchestrator/src](../index.md) / FileServerEntry

# Interface: FileServerEntry

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

En statisk filserveringsmiddelware-indgang.

## Egenskaber

### mountPath

> **mountPath**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

URL-stiprefix til at montere middlewaren på, f.eks. `"/styles/apps"`.

***

### serveDir

> **serveDir**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Lokalt katalog til at servere filer fra.

***

### extension

> **extension**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Servér kun filer hvis URL-sti ender med denne udvidelse, f.eks. `".css"`.

***

### contentType

> **contentType**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Værdi for `Content-Type` svarhoveder.

***

### pathTransform?

> `optional` **pathTransform?**: (`urlRelativePath`) => `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Valgfri transformation anvendt på URL-relativ sti før opløsning mod `serveDir`, f.eks.
`(p) => p.replace(//([^/]+)\.css$/, "/$1/app.css")`.

#### Parametre

##### urlRelativePath

`string`

#### Returnerer

`string`
