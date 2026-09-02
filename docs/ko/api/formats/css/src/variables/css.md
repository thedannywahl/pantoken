[pantoken](../../../../index.md) / [formats/css/src](../index.md) / css

# 변수: css

> `const` **css**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

The ready-made `rebrand` stylesheet string (typed: concrete tokens as `@property` registrations).

## 예제

```ts
import { css } from "@pantoken/css";

document.head.insertAdjacentHTML("beforeend", `<style>${css}</style>`);
```
