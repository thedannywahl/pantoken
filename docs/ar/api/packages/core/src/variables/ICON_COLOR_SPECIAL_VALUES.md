[pantoken](../../../../index.md) / [packages/core/src](../index.md) / ICON\_COLOR\_SPECIAL\_VALUES

# Variable: ICON\_COLOR\_SPECIAL\_VALUES

> `const` **ICON\_COLOR\_SPECIAL\_VALUES**: `Readonly`\<`Record`\<`string`, `string`>>>>>>>>\>\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

قيم ألوان الرموز التي لا توجد في أي مكان آخر في الرموز المولدة.

- `inherit`: كلمة CSS `currentColor`.
- `ai`: تدرج مكون من رموز تدرج لون الرمز `aiSecondary`.

## Example

```ts
import { ICON_COLOR_SPECIAL_VALUES } from "@pantoken/core";

ICON_COLOR_SPECIAL_VALUES.inherit; // → "currentColor"
ICON_COLOR_SPECIAL_VALUES.ai; // → "linear-gradient(180deg, var(--instui-…) 0%, …)"
```
