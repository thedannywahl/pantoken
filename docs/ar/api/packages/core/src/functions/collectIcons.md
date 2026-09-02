[pantoken](../../../../index.md) / [packages/core/src](../index.md) / collectIcons

# دالة: collectIcons()

> **collectIcons**(`options?`): [`IconLayer`](../interfaces/IconLayer.md)

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

جمع طبقة أيقونات InstUI الموحدة. الرموز المخصصة لها الأولوية على رموز Lucide
ذات الاسم نفسه. يتم ترتيب الإخراج حسب الاسم للحصول على نتائج حتمية.

## المعلمات

### options?

[`CollectIconsOptions`](../interfaces/CollectIconsOptions.md) = `{}`

## القيم المرجعة

[`IconLayer`](../interfaces/IconLayer.md)

## أمثلة

**جمع كل الرموز بالإضافة إلى القيم الخاصة بلون الأيقونة**

```ts
import { collectIcons } from "@pantoken/core";

const { glyphs, colors } = collectIcons();
// glyphs → IconToken[] (Custom + Lucide, name-sorted)
// colors → [["--instui-icon-color-ai", "…"], ["--instui-icon-color-inherit", "currentColor"]]
```

**قصر على الرموز المؤلفة بواسطة Instructure فقط**

```ts
import { collectIcons } from "@pantoken/core";

const { glyphs } = collectIcons({ includeLucide: false });
// → only the Custom (Instructure-authored) glyphs
```
