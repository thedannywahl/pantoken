[pantoken](../../../../index.md) / [formats/css/src](../index.md) / css

# वैरिएबल: css

> `const` **css**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

The ready-made `rebrand` stylesheet string (typed: concrete tokens as `@property` registrations).

## उदाहरण

```ts
import { css } from "@pantoken/css";

document.head.insertAdjacentHTML("beforeend", `<style>${css}</style>`);
```
