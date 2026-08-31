[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / iconsByName

# Variable: iconsByName

> `const` **iconsByName**: `Map`\<`string`, [`PantokenIcon`](../interfaces/PantokenIcon.md)>>>>\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Hvert pantoken-ikon, nøgleficeret efter navn.

## Example

```ts
import { iconsByName } from "@pantoken/icons";

iconsByName.get("arrow-left")?.svg; // inline SVG markup
```
