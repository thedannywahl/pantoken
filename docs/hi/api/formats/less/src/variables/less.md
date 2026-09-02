[pantoken](../../../../index.md) / [formats/less/src](../index.md) / less

# वैरिएबल: less

> `const` **less**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">प्रयोगात्मक</span>

The ready-made `rebrand` Less variable set.

## उदाहरण

```ts
import { less } from "@pantoken/less";
import { writeFileSync } from "node:fs";

writeFileSync("tokens.less", less);
```
