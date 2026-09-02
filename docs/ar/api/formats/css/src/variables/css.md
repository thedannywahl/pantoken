[pantoken](../../../../index.md) / [formats/css/src](../index.md) / css

# متغير: css

> `const` **css**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

سلسلة ورقة الأنماط الجاهزة `rebrand` (مُحددة النوع: الرموز الملموسة كتسجيلات `@property`).

## مثال

```ts
import { css } from "@pantoken/css";

document.head.insertAdjacentHTML("beforeend", `<style>${css}</style>`);
```
