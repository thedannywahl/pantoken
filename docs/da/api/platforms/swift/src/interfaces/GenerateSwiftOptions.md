[pantoken](../../../../index.md) / [platforms/swift/src](../index.md) / GenerateSwiftOptions

# Interface: GenerateSwiftOptions

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Muligheder for [generateSwift](../functions/generateSwift.md) / [toSwift](../functions/toSwift.md).

## Egenskaber

### outDir

> **outDir**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Output-mappen.

***

### theme?

> `optional` **theme?**: [`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Temaet til udsendelse (standard: `"rebrand"`).

***

### mode?

> `optional` **mode?**: [`Mode`](../../../../packages/core/src/type-aliases/Mode.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Hvilken `light-dark()` tilstand der skal løses (standard: `"light"`).

***

### className?

> `optional` **className?**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Det genererede Swift-klassenavn (standard: `PanTokens`).

***

### icons?

> `optional` **icons?**: `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Ikonnavn der også skal udles til `Icons.xcassets` som vektor-bevarende billedgrupper.
