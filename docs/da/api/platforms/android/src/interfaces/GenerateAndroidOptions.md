[pantoken](../../../../index.md) / [platforms/android/src](../index.md) / GenerateAndroidOptions

# Interface: GenerateAndroidOptions

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Muligheder for [generateAndroid](../functions/generateAndroid.md) / [toAndroid](../functions/toAndroid.md).

## Egenskaber

### outDir

> **outDir**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Udgangsmappe; filer skrives under `&lt;outDir&gt;/res/values`.

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

### icons?

> `optional` **icons?**: `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Ikonnavn, som også skal udsendeles som VectorDrawables under `res/drawable` (standard: ingen).
