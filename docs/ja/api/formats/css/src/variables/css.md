[pantoken](../../../../index.md) / [formats/css/src](../index.md) / css

# 変数: css

> `const` **css**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

The ready-made `rebrand` stylesheet string (typed: concrete tokens as `@property` registrations).

## 例

```ts
import { css } from "@pantoken/css";

document.head.insertAdjacentHTML("beforeend", `<style>${css}</style>`);
```
