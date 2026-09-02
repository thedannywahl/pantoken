[pantoken](../../../../index.md) / [packages/core/src](../index.md) / collectIcons

# Funktion: collectIcons()

> **collectIcons**(`options?`): [`IconLayer`](../interfaces/IconLayer.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Saml det samlede InstUI-ikonlag. Brugerdefinerede glyfer har forrang over Lucide-glyfer med samme navn.
Outputtet sorteres efter navn for deterministiske resultater.

## Parametre

### options?

[`CollectIconsOptions`](../interfaces/CollectIconsOptions.md) = `{}`

## Returnerer

[`IconLayer`](../interfaces/IconLayer.md)

## Eksempler

**Saml hver glyf plus de specielle ikonfarve-værdier**

```ts
import { collectIcons } from "@pantoken/core";

const { glyphs, colors } = collectIcons();
// glyphs → IconToken[] (Custom + Lucide, name-sorted)
// colors → [["--instui-icon-color-ai", "…"], ["--instui-icon-color-inherit", "currentColor"]]
```

**Begræns til kun Instructure-forfattede glyfer**

```ts
import { collectIcons } from "@pantoken/core";

const { glyphs } = collectIcons({ includeLucide: false });
// → only the Custom (Instructure-authored) glyphs
```
