[pantoken](../../../../index.md) / [packages/core/src](../index.md) / ICON\_COLOR\_SPECIAL\_VALUES

# Variabel: ICON\_COLOR\_SPECIAL\_VALUES

> `const` **ICON\_COLOR\_SPECIAL\_VALUES**: `Readonly`\<`Record`\<`string`, `string`\>\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Ikonfarveværdier, der ikke findes andre steder i de genererede tokens.

- `inherit`: CSS-nøgleordet `currentColor`.
- `ai`: en gradient sammensat af to `aiSecondary` gradient-ikonfarve-tokens.

## Eksempel

```ts
import { ICON_COLOR_SPECIAL_VALUES } from "@pantoken/core";

ICON_COLOR_SPECIAL_VALUES.inherit; // → "currentColor"
ICON_COLOR_SPECIAL_VALUES.ai;      // → "linear-gradient(180deg, var(--instui-…) 0%, …)"
```
