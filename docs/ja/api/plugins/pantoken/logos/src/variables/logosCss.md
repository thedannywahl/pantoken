[pantoken](../../../../../index.md) / [plugins/pantoken/logos/src](../index.md) / logosCss

# 変数: logosCss

> `const` **logosCss**: `string` = `LOGOS_CSS`

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

The ready-made image-token stylesheet (the same text as `./logos.css`).

## 例

**Inline the logo tokens into a page**

```ts
import { logosCss } from "@pantoken/plugin-logos";

document.head.insertAdjacentHTML("beforeend", `<style>${logosCss}</style>`);
// then in CSS: background-image: var(--instui-logo-canvas-horizontal-full-color);
```
