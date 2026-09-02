[pantoken](../../../../index.md) / [platforms/swift/src](../index.md) / GenerateSwiftOptions

# Gränssnitt: GenerateSwiftOptions

<span class="instui-pill -color-danger pantoken-doc-tag">Experimentell</span>

Options for [generateSwift](../functions/generateSwift.md) / [toSwift](../functions/toSwift.md).

## Egenskaper

### outDir

> **outDir**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimentell</span>

The output directory.

***

### theme?

> `optional` **theme?**: [`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimentell</span>

The theme to emit (default: `"rebrand"`).

***

### mode?

> `optional` **mode?**: [`Mode`](../../../../packages/core/src/type-aliases/Mode.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimentell</span>

Which `light-dark()` mode to resolve (default: `"light"`).

***

### className?

> `optional` **className?**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimentell</span>

The generated Swift class name (default: `PanTokens`).

***

### icons?

> `optional` **icons?**: `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimentell</span>

Icon names to also emit into `Icons.xcassets` as vector-preserving imagesets.
