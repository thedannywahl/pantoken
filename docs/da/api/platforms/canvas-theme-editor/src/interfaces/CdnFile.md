[pantoken](../../../../index.md) / [platforms/canvas-theme-editor/src](../index.md) / CdnFile

# Interface: CdnFile

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

En enkelt fil til indlæsning fra en CDN, identificeret ved npm-pakkenavn og sti inden i den.

## Egenskaber

### package

> **package**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

npm-pakkenavnet, f.eks. `"@pantoken/components"`.

***

### path?

> `optional` **path?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Stien inden i pakken, f.eks. `"dist/components.css"`. Udelad for at referere til pakkeroden.

***

### version?

> `optional` **version?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Tilsidesætter provider/build-level-versionen for denne fil kun.

***

### raw?

> `optional` **raw?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

For providere, der transformerer JS som standard (esm.sh): `false` lader provideren anvende dens normale ESM-transformation (nødvendig for at `import` et reelt pakkeindgangspunkt). Standard til `true` — serverer filen uændret, påkrævet for forbyggede/ikke-ESM-aktiver som CSS-ark og IIFE-bundler.
