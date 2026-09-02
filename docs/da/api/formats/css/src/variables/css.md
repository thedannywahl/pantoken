[pantoken](../../../../index.md) / [formats/css/src](../index.md) / css

# Variabel: css

> `const` **css**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Det parat `rebrand` stylesheet-streng (typet: konkrete tokens som `@property` registreringer).

## Eksempel

```ts
import { css } from "@pantoken/css";

document.head.insertAdjacentHTML("beforeend", `<style>${css}</style>`);
```
