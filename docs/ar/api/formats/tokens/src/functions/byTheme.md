[pantoken](../../../../index.md) / [formats/tokens/src](../index.md) / byTheme

# Function: byTheme()

> **byTheme**(`theme`): [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

البحث عن IR الموضوع حسب الاسم.

## Parameters

### theme

[`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

## Returns

[`Token`](../../../../packages/core/src/interfaces/Token.md)[]

## Example

```ts
import { byTheme } from "@pantoken/tokens";
import { toScss } from "@pantoken/scss";

toScss(byTheme("canvas"), { mode: "dark" });
```
