[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / icons

# 変数: icons

> `const` **icons**: [`PantokenIcon`](../interfaces/PantokenIcon.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

Every pantoken icon, sorted by name.

## 例

```ts
import { icons } from "@pantoken/icons";

icons.length; // the full set
icons.filter((i) => i.source === "lucide"); // just the Lucide glyphs
```
