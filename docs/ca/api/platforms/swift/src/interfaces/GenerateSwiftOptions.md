[pantoken](../../../../index.md) / [platforms/swift/src](../index.md) / GenerateSwiftOptions

# Interfície: GenerateSwiftOptions

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Opcions per a [generateSwift](../functions/generateSwift.md) / [toSwift](../functions/toSwift.md).

## Propietats

### outDir

> **outDir**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

El directori de sortida.

***

### theme?

> `optional` **theme?**: [`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

El tema per emeteri (per defecte: `"rebrand"`).

***

### mode?

> `optional` **mode?**: [`Mode`](../../../../packages/core/src/type-aliases/Mode.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Quin mode `light-dark()` resoldre (per defecte: `"light"`).

***

### className?

> `optional` **className?**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

El nom de la classe Swift generada (per defecte: `PanTokens`).

***

### icons?

> `optional` **icons?**: `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Noms d'icones per emetre també a `Icons.xcassets` com a conjunts d'imatges que preserven vectors.
