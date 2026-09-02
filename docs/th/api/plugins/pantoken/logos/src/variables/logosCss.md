[pantoken](../../../../../index.md) / [plugins/pantoken/logos/src](../index.md) / logosCss

# ตัวแปร: logosCss

> `const` **logosCss**: `string` = `LOGOS_CSS`

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

The ready-made image-token stylesheet (the same text as `./logos.css`).

## ตัวอย่าง

**Inline the logo tokens into a page**

```ts
import { logosCss } from "@pantoken/plugin-logos";

document.head.insertAdjacentHTML("beforeend", `<style>${logosCss}</style>`);
// then in CSS: background-image: var(--instui-logo-canvas-horizontal-full-color);
```
