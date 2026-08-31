[pantoken](../../../../index.md) / [platforms/swift/src](../index.md) / GenerateSwiftOptions

# Interface: GenerateSwiftOptions

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Muligheder for [generateSwift](../functions/generateSwift.md) / [toSwift](../functions/toSwift.md).

## Properties

### outDir

> **outDir**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Output-mappen.

---

### theme?

> `optional` **theme?**: [`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Temaet til udsendelse (standard: `"rebrand"`).

---

### mode?

> `optional` **mode?**: [`Mode`](../../../../packages/core/src/type-aliases/Mode.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Hvilken `light-dark()` tilstand der skal løses (standard: `"light"`).

---

### className?

> `optional` **className?**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Det genererede Swift-klassenavn (standard: `PanTokens`).

---

### icons?

> `optional` **icons?**: `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Ikonnavn der også skal udles til `Icons.xcassets` som vektor-bevarende billedgrupper.
