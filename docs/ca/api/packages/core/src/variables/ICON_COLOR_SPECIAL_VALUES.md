[pantoken](../../../../index.md) / [packages/core/src](../index.md) / ICON\_COLOR\_SPECIAL\_VALUES

# Variable: ICON\_COLOR\_SPECIAL\_VALUES

> `const` **ICON\_COLOR\_SPECIAL\_VALUES**: `Readonly`\<`Record`\<`string`, `string`\>\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Valors de color d'icona que no existeixen en cap altre lloc en els tokens generats.

- `inherit`: la paraula clau CSS `currentColor`.
- `ai`: un gradient compost per dos tokens de color d'icona gradient `aiSecondary`.

## Exemple

```ts
import { ICON_COLOR_SPECIAL_VALUES } from "@pantoken/core";

ICON_COLOR_SPECIAL_VALUES.inherit; // → "currentColor"
ICON_COLOR_SPECIAL_VALUES.ai;      // → "linear-gradient(180deg, var(--instui-…) 0%, …)"
```
