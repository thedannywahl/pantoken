[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / iconsByName

# Variable: iconsByName

> `const` **iconsByName**: `Map`\<`string`, [`PantokenIcon`](../interfaces/PantokenIcon.md)\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Cada icona pantoken, indexada pel nom.

## Example

```ts
import { iconsByName } from "@pantoken/icons";

iconsByName.get("arrow-left")?.svg; // inline SVG markup
```
