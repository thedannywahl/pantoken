[pantoken](../../../../../index.md) / [plugins/vite/workspace-orchestrator/src](../index.md) / FileServerEntry

# इंटरफेस: FileServerEntry

<span class="instui-pill -color-danger pantoken-doc-tag">प्रयोगात्मक</span>

One static file-serving middleware entry.

## प्रॉपर्टीज

### mountPath

> **mountPath**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">प्रयोगात्मक</span>

URL path prefix to mount the middleware at, e.g. `"/styles/apps"`.

***

### serveDir

> **serveDir**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">प्रयोगात्मक</span>

Local directory to serve files from.

***

### extension

> **extension**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">प्रयोगात्मक</span>

Only serve files whose URL path ends with this extension, e.g. `".css"`.

***

### contentType

> **contentType**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">प्रयोगात्मक</span>

Value for the `Content-Type` response header.

***

### pathTransform?

> `optional` **pathTransform?**: (`urlRelativePath`) => `string`

<span class="instui-pill -color-danger pantoken-doc-tag">प्रयोगात्मक</span>

Optional transform applied to the URL-relative path before resolving against `serveDir`, e.g.
`(p) => p.replace(//([^/]+)\.css$/, "/$1/app.css")`.

#### पैरामीटर

##### urlRelativePath

`string`

#### वापसी

`string`
