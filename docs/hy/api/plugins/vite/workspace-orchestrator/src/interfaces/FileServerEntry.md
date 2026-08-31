[pantoken](../../../../../index.md) / [plugins/vite/workspace-orchestrator/src](../index.md) / FileServerEntry

# Interface: FileServerEntry

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Մեկ static file-serving middleware մուտք:

## Properties

### mountPath

> **mountPath**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

URL ճանապարհի նախածանց middleware-ը mount-ել, օր. `"/styles/apps"`:

---

### serveDir

> **serveDir**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Տեղական directory ֆայլերի ծառայությունից:

---

### extension

> **extension**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Ծառայեցրեք միայն այն ֆայլերին, որոնց URL ճանապարհը ավարտվում է այս ընդլայնմամբ, օր. `".css"`:

---

### contentType

> **contentType**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`Content-Type` պատասխանի header-ի արժեք:

---

### pathTransform?

> `optional` **pathTransform?**: (`urlRelativePath`) => `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Ընտրովի փոխակերպում, որը կիրառվում է URL-հարակցական ճանապարհին `serveDir`-ի դեմ լուծելուց առաջ, օր.
`(p) => p.replace(//([^/]+)\.css$/, "/$1/app.css")`:

#### Parameters

##### urlRelativePath

`string`

#### Returns

`string`
