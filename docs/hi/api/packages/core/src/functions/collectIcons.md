[pantoken](../../../../index.md) / [packages/core/src](../index.md) / collectIcons

# फंक्शन: collectIcons()

> **collectIcons**(`options?`): [`IconLayer`](../interfaces/IconLayer.md)

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

Collect the unified InstUI icon layer. Custom glyphs take precedence over same-named Lucide
glyphs. Output is sorted by name for deterministic results.

## पैरामीटर

### options?

[`CollectIconsOptions`](../interfaces/CollectIconsOptions.md) = `{}`

## वापसी

[`IconLayer`](../interfaces/IconLayer.md)

## उदाहरण

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
