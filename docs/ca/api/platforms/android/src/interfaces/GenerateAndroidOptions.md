[pantoken](../../../../index.md) / [platforms/android/src](../index.md) / GenerateAndroidOptions

# Interface: GenerateAndroidOptions

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Opcions per a [generateAndroid](../functions/generateAndroid.md) / [toAndroid](../functions/toAndroid.md).

## Properties

### outDir

> **outDir**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

El directori de sortida; els fitxers s'escriuen sota `&lt;outDir&gt;/res/values`.

---

### theme?

> `optional` **theme?**: [`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

El tema per emeteri (per defecte: `"rebrand"`).

---

### mode?

> `optional` **mode?**: [`Mode`](../../../../packages/core/src/type-aliases/Mode.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Quin mode `light-dark()` resoldre (per defecte: `"light"`).

---

### icons?

> `optional` **icons?**: `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Noms d'icones per emeteri també com a VectorDrawables sota `res/drawable` (per defecte: cap).
