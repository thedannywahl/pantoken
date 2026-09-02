[pantoken](../../../../../index.md) / [plugins/vite/workspace-orchestrator/src](../index.md) / FileServerEntry

# 인터페이스: FileServerEntry

<span class="instui-pill -color-danger pantoken-doc-tag">실험적</span>

One static file-serving middleware entry.

## 속성

### mountPath

> **mountPath**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">실험적</span>

URL path prefix to mount the middleware at, e.g. `"/styles/apps"`.

***

### serveDir

> **serveDir**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">실험적</span>

Local directory to serve files from.

***

### extension

> **extension**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">실험적</span>

Only serve files whose URL path ends with this extension, e.g. `".css"`.

***

### contentType

> **contentType**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">실험적</span>

Value for the `Content-Type` response header.

***

### pathTransform?

> `optional` **pathTransform?**: (`urlRelativePath`) => `string`

<span class="instui-pill -color-danger pantoken-doc-tag">실험적</span>

Optional transform applied to the URL-relative path before resolving against `serveDir`, e.g.
`(p) => p.replace(//([^/]+)\.css$/, "/$1/app.css")`.

#### 매개변수

##### urlRelativePath

`string`

#### 반환값

`string`
