[pantoken](../../../../index.md) / [platforms/canvas-theme-editor/src](../index.md) / CdnFile

# 인터페이스: CdnFile

<span class="instui-pill -color-warning pantoken-doc-tag">알파</span>

A single file to load from a CDN, identified by npm package name and path within it.

## 속성

### package

> **package**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">알파</span>

The npm package name, e.g. `"@pantoken/components"`.

***

### path?

> `optional` **path?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">알파</span>

The path within the package, e.g. `"dist/components.css"`. Omit to reference the package root.

***

### version?

> `optional` **version?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">알파</span>

Overrides the provider/build-level version for this file only.

***

### raw?

> `optional` **raw?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">알파</span>

For providers that transform JS by default (esm.sh): `false` lets the provider apply its normal
ESM transform (needed to `import` a real package entry point). Defaults to `true` — serve the
file verbatim, required for prebuilt/non-ESM assets like CSS sheets and IIFE bundles.
