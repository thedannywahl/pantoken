[pantoken](../../../../../index.md) / [plugins/pantoken/logos/src](../index.md) / logosCss

# متغير: logosCss

> `const` **logosCss**: `string` = `LOGOS_CSS`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

ورقة أنماط image-token الجاهزة (نفس النص مثل `./logos.css`).

## مثال

**أدرج رموز الشعار داخل الصفحة**

```ts
import { logosCss } from "@pantoken/plugin-logos";

document.head.insertAdjacentHTML("beforeend", `<style>${logosCss}</style>`);
// then in CSS: background-image: var(--instui-logo-canvas-horizontal-full-color);
```
