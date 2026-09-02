[pantoken](../../../../index.md) / [platforms/swift/src](../index.md) / GenerateSwiftOptions

# واجهة: GenerateSwiftOptions

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

خيارات لـ [generateSwift](../functions/generateSwift.md) / [toSwift](../functions/toSwift.md).

## الخصائص

### outDir

> **outDir**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

دليل الإخراج.

***

### theme?

> `optional` **theme?**: [`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

السمة التي سيتم إصدارها (الافتراضي: `"rebrand"`).

***

### mode?

> `optional` **mode?**: [`Mode`](../../../../packages/core/src/type-aliases/Mode.md)

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

أي وضع `light-dark()` لحله (الافتراضي: `"light"`).

***

### className?

> `optional` **className?**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

اسم فئة Swift المولدة (الافتراضي: `PanTokens`).

***

### icons?

> `optional` **icons?**: `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

أسماء الرموز التي يجب إصدارها أيضاً داخل `Icons.xcassets` كمجموعات صور تحافظ على المتجهات.
