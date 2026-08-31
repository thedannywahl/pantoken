[pantoken](../../../../index.md) / [packages/core/src](../index.md) / collectIcons

# Function: collectIcons()

> **collectIcons**(`options?`): [`IconLayer`](../interfaces/IconLayer.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Recull la capa d'icona InstUI unificada. Els glifos personalitzats tenen prioritat sobre els glifos de Lucide amb el mateix nom.
La sortida s'ordena per nom per a resultats deterministes.

## Parameters

### options?

[`CollectIconsOptions`](../interfaces/CollectIconsOptions.md) = `{}`

## Returns

[`IconLayer`](../interfaces/IconLayer.md)

## Examples

**Recull cada glifo més els valors especials d'icon-colour**

```ts
import { collectIcons } from "@pantoken/core";

const { glyphs, colors } = collectIcons();
// glyphs → IconToken[] (Custom + Lucide, name-sorted)
// colors → [["--instui-icon-color-ai", "…"], ["--instui-icon-color-inherit", "currentColor"]]
```

**Restringeix només als glifos autors d'Instructure**

```ts
import { collectIcons } from "@pantoken/core";

const { glyphs } = collectIcons({ includeLucide: false });
// → only the Custom (Instructure-authored) glyphs
```
