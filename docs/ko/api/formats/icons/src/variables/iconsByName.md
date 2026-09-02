[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / iconsByName

# 변수: iconsByName

> `const` **iconsByName**: `Map`\<`string`, [`PantokenIcon`](../interfaces/PantokenIcon.md)\>

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Every pantoken icon, keyed by name.

## 예제

```ts
import { iconsByName } from "@pantoken/icons";

iconsByName.get("arrow-left")?.svg; // inline SVG markup
```
