[pantoken](../../../../../index.md) / [plugins/vite/workspace-orchestrator/src](../index.md) / FileServerEntry

# Interfáhta: FileServerEntry

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentála</span>

One static file-serving middleware entry.

## Properties

### mountPath

> **mountPath**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentála</span>

URL path prefix to mount the middleware at, e.g. `"/styles/apps"`.

***

### serveDir

> **serveDir**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentála</span>

Local directory to serve files from.

***

### extension

> **extension**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentála</span>

Only serve files whose URL path ends with this extension, e.g. `".css"`.

***

### contentType

> **contentType**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentála</span>

Value for the `Content-Type` response header.

***

### pathTransform?

> `optional` **pathTransform?**: (`urlRelativePath`) => `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentála</span>

Optional transform applied to the URL-relative path before resolving against `serveDir`, e.g.
`(p) => p.replace(//([^/]+)\.css$/, "/$1/app.css")`.

#### Parametera

##### urlRelativePath

`string`

#### Gullii / Gávdnat

`string`
