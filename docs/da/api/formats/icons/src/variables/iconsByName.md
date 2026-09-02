[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / iconsByName

# Variabel: iconsByName

> `const` **iconsByName**: `Map`\<`string`, [`PantokenIcon`](../interfaces/PantokenIcon.md)\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Hvert pantoken-ikon, nøgleficeret efter navn.

## Eksempel

```ts
import { iconsByName } from "@pantoken/icons";

iconsByName.get("arrow-left")?.svg; // inline SVG markup
```
