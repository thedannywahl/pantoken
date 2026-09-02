[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / icons

# 변수: icons

> `const` **icons**: [`PantokenIcon`](../interfaces/PantokenIcon.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Every pantoken icon, sorted by name.

## 예제

```ts
import { icons } from "@pantoken/icons";

icons.length; // the full set
icons.filter((i) => i.source === "lucide"); // just the Lucide glyphs
```
