[pantoken](../../../../index.md) / [packages/core/src](../index.md) / ICON\_COLOR\_SPECIAL\_VALUES

# متغير: ICON\_COLOR\_SPECIAL\_VALUES

> `const` **ICON\_COLOR\_SPECIAL\_VALUES**: `Readonly`\<`Record`\<`string`, `string`\>\>

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

قيم ألوان الأيقونات التي لا توجد في أي مكان آخر ضمن الرموز المولدة.

- `inherit`: كلمة مفتاحية CSS `currentColor`.
- `ai`: تدرج مكوّن من توكنين لألوان الأيقونات من نوع تدرج `aiSecondary`.

## مثال

```ts
import { ICON_COLOR_SPECIAL_VALUES } from "@pantoken/core";

ICON_COLOR_SPECIAL_VALUES.inherit; // → "currentColor"
ICON_COLOR_SPECIAL_VALUES.ai;      // → "linear-gradient(180deg, var(--instui-…) 0%, …)"
```
