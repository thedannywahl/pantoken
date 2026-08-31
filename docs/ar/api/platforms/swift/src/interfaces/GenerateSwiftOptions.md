[pantoken](../../../../index.md) / [platforms/swift/src](../index.md) / GenerateSwiftOptions

# Interface: GenerateSwiftOptions

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

خيارات [generateSwift](../functions/generateSwift.md) / [toSwift](../functions/toSwift.md).

## Properties

### outDir

> **outDir**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

مجلد الإخراج.

---

### theme?

> `optional` **theme?**: [`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

الموضوع المراد إصداره (الافتراضي: `"rebrand"`).

---

### mode?

> `optional` **mode?**: [`Mode`](../../../../packages/core/src/type-aliases/Mode.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

أي وضع `light-dark()` تحتاج إلى حل (الافتراضي: `"light"`).

---

### className?

> `optional` **className?**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

اسم فئة Swift المُنشأة (الافتراضي: `PanTokens`).

---

### icons?

> `optional` **icons?**: `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

أسماء الأيقونات المراد بثها أيضاً في `Icons.xcassets` كمجموعات صور محافظة على المتجهات.
