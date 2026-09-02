[pantoken](../../../../index.md) / [formats/css/src](../index.md) / css

# 變數: css

> `const` **css**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

The ready-made `rebrand` stylesheet string (typed: concrete tokens as `@property` registrations).

## 範例

```ts
import { css } from "@pantoken/css";

document.head.insertAdjacentHTML("beforeend", `<style>${css}</style>`);
```
