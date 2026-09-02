[pantoken](../../../../index.md) / [platforms/android/src](../index.md) / GenerateAndroidOptions

# Інтерфейс: GenerateAndroidOptions

<span class="instui-pill -color-danger pantoken-doc-tag">Експериментальний</span>

Options for [generateAndroid](../functions/generateAndroid.md) / [toAndroid](../functions/toAndroid.md).

## Властивості

### outDir

> **outDir**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Експериментальний</span>

The output directory; files are written under `&lt;outDir&gt;/res/values`.

***

### theme?

> `optional` **theme?**: [`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Експериментальний</span>

The theme to emit (default: `"rebrand"`).

***

### mode?

> `optional` **mode?**: [`Mode`](../../../../packages/core/src/type-aliases/Mode.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Експериментальний</span>

Which `light-dark()` mode to resolve (default: `"light"`).

***

### icons?

> `optional` **icons?**: `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">Експериментальний</span>

Icon names to also emit as VectorDrawables under `res/drawable` (default: none).
