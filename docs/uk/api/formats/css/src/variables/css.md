[pantoken](../../../../index.md) / [formats/css/src](../index.md) / css

# Змінна: css

> `const` **css**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

The ready-made `rebrand` stylesheet string (typed: concrete tokens as `@property` registrations).

## Приклад

```ts
import { css } from "@pantoken/css";

document.head.insertAdjacentHTML("beforeend", `<style>${css}</style>`);
```
