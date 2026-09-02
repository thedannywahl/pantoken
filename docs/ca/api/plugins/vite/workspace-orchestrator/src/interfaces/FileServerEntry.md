[pantoken](../../../../../index.md) / [plugins/vite/workspace-orchestrator/src](../index.md) / FileServerEntry

# Interfície: FileServerEntry

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Una entrada de middleware de servei de fitxers estàtics.

## Propietats

### mountPath

> **mountPath**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Prefix de camí URL on muntar el middleware, p. ex. `"/styles/apps"`.

***

### serveDir

> **serveDir**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Directori local des del qual servir fitxers.

***

### extension

> **extension**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Només servir fitxers la ruta URL dels quals acabi amb aquesta extensió, p. ex. `".css"`.

***

### contentType

> **contentType**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Valor per a la capçalera de resposta `Content-Type`.

***

### pathTransform?

> `optional` **pathTransform?**: (`urlRelativePath`) => `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Transformació opcional aplicada al camí relatiu d'URL abans de resoldre contra `serveDir`, p. ex.
`(p) => p.replace(//([^/]+)\.css$/, "/$1/app.css")`.

#### Paràmetres

##### urlRelativePath

`string`

#### Retorna

`string`
