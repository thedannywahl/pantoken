[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / iconsByName

# Змінна: iconsByName

> `const` **iconsByName**: `Map`\<`string`, [`PantokenIcon`](../interfaces/PantokenIcon.md)\>

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Every pantoken icon, keyed by name.

## Приклад

```ts
import { iconsByName } from "@pantoken/icons";

iconsByName.get("arrow-left")?.svg; // inline SVG markup
```
