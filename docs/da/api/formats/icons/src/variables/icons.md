[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / icons

# Variabel: icons

> `const` **icons**: [`PantokenIcon`](../interfaces/PantokenIcon.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Hvert pantoken-ikon, sorteret efter navn.

## Eksempel

```ts
import { icons } from "@pantoken/icons";

icons.length; // the full set
icons.filter((i) => i.source === "lucide"); // just the Lucide glyphs
```
