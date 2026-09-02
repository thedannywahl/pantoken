[pantoken](../../../../index.md) / [packages/core/src](../index.md) / collectIcons

# تابع: collectIcons()

> **collectIcons**(`options?`): [`IconLayer`](../interfaces/IconLayer.md)

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

Collect the unified InstUI icon layer. Custom glyphs take precedence over same-named Lucide
glyphs. Output is sorted by name for deterministic results.

## پارامترها

### options?

[`CollectIconsOptions`](../interfaces/CollectIconsOptions.md) = `{}`

## مقدار بازگشتی

[`IconLayer`](../interfaces/IconLayer.md)

## نمونه‌ها

**Collect every glyph plus the icon-colour special values**

```ts
import { collectIcons } from "@pantoken/core";

const { glyphs, colors } = collectIcons();
// glyphs → IconToken[] (Custom + Lucide, name-sorted)
// colors → [["--instui-icon-color-ai", "…"], ["--instui-icon-color-inherit", "currentColor"]]
```

**Restrict to Instructure-authored glyphs only**

```ts
import { collectIcons } from "@pantoken/core";

const { glyphs } = collectIcons({ includeLucide: false });
// → only the Custom (Instructure-authored) glyphs
```
