[pantoken](../../../../index.md) / [formats/css/src](../index.md) / css

# Variable: css

> `const` **css**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

La cadena de fulla d'estil `rebrand` ja preparada (tipificada: tokens concrets com a registres de `@property`).

## Example

```ts
import { css } from "@pantoken/css";

document.head.insertAdjacentHTML("beforeend", `<style>${css}</style>`);
```
