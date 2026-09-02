[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / iconsByName

# Zmienna: iconsByName

> `const` **iconsByName**: `Map`\<`string`, [`PantokenIcon`](../interfaces/PantokenIcon.md)\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Every pantoken icon, keyed by name.

## Przykład

```ts
import { iconsByName } from "@pantoken/icons";

iconsByName.get("arrow-left")?.svg; // inline SVG markup
```
