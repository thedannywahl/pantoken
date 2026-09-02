[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / icons

# Змінна: icons

> `const` **icons**: [`PantokenIcon`](../interfaces/PantokenIcon.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Every pantoken icon, sorted by name.

## Приклад

```ts
import { icons } from "@pantoken/icons";

icons.length; // the full set
icons.filter((i) => i.source === "lucide"); // just the Lucide glyphs
```
