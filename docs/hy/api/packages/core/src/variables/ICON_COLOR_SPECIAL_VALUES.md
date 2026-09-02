[pantoken](../../../../index.md) / [packages/core/src](../index.md) / ICON\_COLOR\_SPECIAL\_VALUES

# Փոփոխական: ICON\_COLOR\_SPECIAL\_VALUES

> `const` **ICON\_COLOR\_SPECIAL\_VALUES**: `Readonly`\<`Record`\<`string`, `string`\>\>

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Պատկերակի գույնի արժեքներ, որոնք գեներացված տոկենների մեջ այլ վայրում չեն հայտնվում:

- `inherit`: CSS `currentColor` հատուկ բառը:
- `ai`: երկու `aiSecondary` գրադիենտ պատկերակի-գույն տոկենից կազմված գրադիենտ:

## Օրինակ

```ts
import { ICON_COLOR_SPECIAL_VALUES } from "@pantoken/core";

ICON_COLOR_SPECIAL_VALUES.inherit; // → "currentColor"
ICON_COLOR_SPECIAL_VALUES.ai;      // → "linear-gradient(180deg, var(--instui-…) 0%, …)"
```
