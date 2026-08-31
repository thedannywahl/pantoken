[pantoken](../../../../index.md) / [packages/core/src](../index.md) / collectIcons

# Function: collectIcons()

> **collectIcons**(`options?`): [`IconLayer`](../interfaces/IconLayer.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

جمع طبقة الرموز InstUI الموحدة. الرموز المخصصة لها الأولوية على رموز Lucide
بنفس الاسم. يتم فرز الإخراج بالاسم للحصول على نتائج حتمية.

## Parameters

### options?

[`CollectIconsOptions`](../interfaces/CollectIconsOptions.md) = `{}`

## Returns

[`IconLayer`](../interfaces/IconLayer.md)

## Examples

**جمع كل رمز والقيم الخاصة بلون الرمز**

```ts
import { collectIcons } from "@pantoken/core";

const { glyphs, colors } = collectIcons();
// glyphs → IconToken[] (Custom + Lucide, name-sorted)
// colors → [["--instui-icon-color-ai", "…"], ["--instui-icon-color-inherit", "currentColor"]]
```

**تقصير الرموز التي كتبتها Instructure فقط**

```ts
import { collectIcons } from "@pantoken/core";

const { glyphs } = collectIcons({ includeLucide: false });
// → only the Custom (Instructure-authored) glyphs
```
