[pantoken](../../../../index.md) / [platforms/swift/src](../index.md) / GenerateSwiftOptions

# Interface: GenerateSwiftOptions

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

[generateSwift](../functions/generateSwift.md) / [toSwift](../functions/toSwift.md)-ի ընտրանքներ:

## Properties

### outDir

> **outDir**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Արտածման գրացուցակ:

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

### className?

> `optional` **className?**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Ստեղծված Swift դասի անունը (կանխադրված: `PanTokens`):

---

### icons?

> `optional` **icons?**: `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Պատկերակների անունները նաև արտանետել `Icons.xcassets`-ի մեջ որպես վեկտոր-պահպանող imagesets:
