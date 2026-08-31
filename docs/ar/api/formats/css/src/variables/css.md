[pantoken](../../../../index.md) / [formats/css/src](../index.md) / css

# Variable: css

> `const` **css**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

سلسلة ورقة النمط الجاهزة `rebrand` (مكتوبة: الرموز الملموسة كتسجيلات `@property`).

## Example

```ts
import { css } from "@pantoken/css";

document.head.insertAdjacentHTML("beforeend", `<style>${css}</style>`);
```
