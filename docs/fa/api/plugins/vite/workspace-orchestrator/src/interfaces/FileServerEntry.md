[pantoken](../../../../../index.md) / [plugins/vite/workspace-orchestrator/src](../index.md) / FileServerEntry

# رابط: FileServerEntry

<span class="instui-pill -color-danger pantoken-doc-tag">تجربی</span>

One static file-serving middleware entry.

## خصوصیات

### mountPath

> **mountPath**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجربی</span>

URL path prefix to mount the middleware at, e.g. `"/styles/apps"`.

***

### serveDir

> **serveDir**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجربی</span>

Local directory to serve files from.

***

### extension

> **extension**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجربی</span>

Only serve files whose URL path ends with this extension, e.g. `".css"`.

***

### contentType

> **contentType**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجربی</span>

Value for the `Content-Type` response header.

***

### pathTransform?

> `optional` **pathTransform?**: (`urlRelativePath`) => `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجربی</span>

Optional transform applied to the URL-relative path before resolving against `serveDir`, e.g.
`(p) => p.replace(//([^/]+)\.css$/, "/$1/app.css")`.

#### پارامترها

##### urlRelativePath

`string`

#### مقدار بازگشتی

`string`
