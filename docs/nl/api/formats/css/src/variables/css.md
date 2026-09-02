[pantoken](../../../../index.md) / [formats/css/src](../index.md) / css

# Variabele: css

> `const` **css**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Bèta</span>

The ready-made `rebrand` stylesheet string (typed: concrete tokens as `@property` registrations).

## Voorbeeld

```ts
import { css } from "@pantoken/css";

document.head.insertAdjacentHTML("beforeend", `<style>${css}</style>`);
```
