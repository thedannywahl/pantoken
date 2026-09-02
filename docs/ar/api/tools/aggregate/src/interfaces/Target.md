[pantoken](../../../../index.md) / [tools/aggregate/src](../index.md) / Target

# واجهة: Target

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

هدف تم اكتشافه بواسطة الحقل `pantoken`.

## الخصائص

### pkg

> **pkg**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

اسم الحزمة، على سبيل المثال `@pantoken/astro`.

***

### key

> **key**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

مفتاح التجميع / اسم التصدير، مثل `astro`.

***

### kind

> **kind**: `"namespace"` \| `"sideEffect"` \| `"subpath"`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

كيفية تعريض الهدف:
- `namespace` — يعاد تصديره إلى الـeager barrel *و* كمسار فرعي.
- `sideEffect` — يستورد المسار الفرعي مدخل الحزمة `/inject`؛ كما يوجد أيضاً في الـbarrel.
- `subpath` — مسار فرعي فقط، يُحتفظ به خارج الـeager barrel (لأقران ثقيلة مثل React، لذلك `import "pantoken"` لا يحملها أبداً).
