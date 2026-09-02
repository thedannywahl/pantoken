[pantoken](../../../../index.md) / [packages/core/src](../index.md) / collectIcons

# 함수: collectIcons()

> **collectIcons**(`options?`): [`IconLayer`](../interfaces/IconLayer.md)

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Collect the unified InstUI icon layer. Custom glyphs take precedence over same-named Lucide
glyphs. Output is sorted by name for deterministic results.

## 매개변수

### options?

[`CollectIconsOptions`](../interfaces/CollectIconsOptions.md) = `{}`

## 반환값

[`IconLayer`](../interfaces/IconLayer.md)

## 예제들

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
