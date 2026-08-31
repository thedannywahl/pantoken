[pantoken](../../../../index.md) / [formats/css/src](../index.md) / css

# Variable: css

> `const` **css**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Det parat `rebrand` stylesheet-streng (typet: konkrete tokens som `@property` registreringer).

## Example

```ts
import { css } from "@pantoken/css";

document.head.insertAdjacentHTML("beforeend", `<style>${css}</style>`);
```
