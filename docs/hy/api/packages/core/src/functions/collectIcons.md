[pantoken](../../../../index.md) / [packages/core/src](../index.md) / collectIcons

# Ֆունկցիա: collectIcons()

> **collectIcons**(`options?`): [`IconLayer`](../interfaces/IconLayer.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Հավաքեք միավորված InstUI icon layer: Custom glyphs ունեն առաջնություն նույն անվանված Lucide glyphs-ի նկատմամբ: Արդյունքը տեսակավորված է անվան հիման վրա՝ որոշակի արդյունքների համար:

## Պարամետրեր

### options?

[`CollectIconsOptions`](../interfaces/CollectIconsOptions.md) = `{}`

## Վերադարձվող արժեք

[`IconLayer`](../interfaces/IconLayer.md)

## Օրինակներ

**Հավաքեք յուրաքանչյուր glyph-ը, ինչպես նաև icon-colour հատուկ արժեքները**

```ts
import { collectIcons } from "@pantoken/core";

const { glyphs, colors } = collectIcons();
// glyphs → IconToken[] (Custom + Lucide, name-sorted)
// colors → [["--instui-icon-color-ai", "…"], ["--instui-icon-color-inherit", "currentColor"]]
```

**Սահմանափակեք միայն Instructure-authored glyphs-ով**

```ts
import { collectIcons } from "@pantoken/core";

const { glyphs } = collectIcons({ includeLucide: false });
// → only the Custom (Instructure-authored) glyphs
```
