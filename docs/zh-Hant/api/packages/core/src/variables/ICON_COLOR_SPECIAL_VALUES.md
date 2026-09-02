[pantoken](../../../../index.md) / [packages/core/src](../index.md) / ICON\_COLOR\_SPECIAL\_VALUES

# 變數: ICON\_COLOR\_SPECIAL\_VALUES

> `const` **ICON\_COLOR\_SPECIAL\_VALUES**: `Readonly`\<`Record`\<`string`, `string`\>\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

Icon colour values that exist nowhere else in the generated tokens.

- `inherit`: the CSS `currentColor` keyword.
- `ai`: a gradient composed from two `aiSecondary` gradient icon-colour tokens.

## 範例

```ts
import { ICON_COLOR_SPECIAL_VALUES } from "@pantoken/core";

ICON_COLOR_SPECIAL_VALUES.inherit; // → "currentColor"
ICON_COLOR_SPECIAL_VALUES.ai;      // → "linear-gradient(180deg, var(--instui-…) 0%, …)"
```
