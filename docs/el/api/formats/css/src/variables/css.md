[pantoken](../../../../index.md) / [formats/css/src](../index.md) / css

# Μεταβλητή: css

> `const` **css**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

The ready-made `rebrand` stylesheet string (typed: concrete tokens as `@property` registrations).

## Παράδειγμα

```ts
import { css } from "@pantoken/css";

document.head.insertAdjacentHTML("beforeend", `<style>${css}</style>`);
```
