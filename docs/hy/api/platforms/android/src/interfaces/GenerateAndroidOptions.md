[pantoken](../../../../index.md) / [platforms/android/src](../index.md) / GenerateAndroidOptions

# Ինտերֆեյս: GenerateAndroidOptions

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Ընտրանքներ [generateAndroid](../functions/generateAndroid.md) / [toAndroid](../functions/toAndroid.md)-ի համար:

## Առանձնահատկություններ

### outDir

> **outDir**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Ելքային թղթապանակ; ֆայլերը գրվում են `&lt;outDir&gt;/res/values`-ի ներքո:

***

### theme?

> `optional` **theme?**: [`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Արտածել թեմայ (հայտնի: `"rebrand"`):

***

### mode?

> `optional` **mode?**: [`Mode`](../../../../packages/core/src/type-aliases/Mode.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Որ `light-dark()` ռեժիմ պետք է լուծել (հայտնի: `"light"`):

***

### icons?

> `optional` **icons?**: `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Պատկերի անունները, որոնք նաև արտածել որպես VectorDrawables `res/drawable`-ի ներքո (հայտնի. ոչ):
