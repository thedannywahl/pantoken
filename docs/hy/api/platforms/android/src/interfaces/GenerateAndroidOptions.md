[pantoken](../../../../index.md) / [platforms/android/src](../index.md) / GenerateAndroidOptions

# Interface: GenerateAndroidOptions

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Ընտրանքներ [generateAndroid](../functions/generateAndroid.md) / [toAndroid](../functions/toAndroid.md)-ի համար:

## Properties

### outDir

> **outDir**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Ելքային թղթապանակ; ֆայլերը գրվում են `&lt;outDir&gt;/res/values`-ի ներքո:

---

### theme?

> `optional` **theme?**: [`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Արտածել թեմայ (հայտնի: `"rebrand"`):

---

### mode?

> `optional` **mode?**: [`Mode`](../../../../packages/core/src/type-aliases/Mode.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Որ `light-dark()` ռեժիմ պետք է լուծել (հայտնի: `"light"`):

---

### icons?

> `optional` **icons?**: `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Պատկերի անունները, որոնք նաև արտածել որպես VectorDrawables `res/drawable`-ի ներքո (հայտնի. ոչ):
