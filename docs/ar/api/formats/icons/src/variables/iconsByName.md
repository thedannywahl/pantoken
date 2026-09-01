[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / iconsByName

# متغير: iconsByName

> `const` **iconsByName**: `Map`\<`string`, [`PantokenIcon`](../interfaces/PantokenIcon.md)\>

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

كل أيقونة pantoken، مفهرسة حسب الاسم.

## مثال

```ts
import { iconsByName } from "@pantoken/icons";

iconsByName.get("arrow-left")?.svg; // inline SVG markup
```
