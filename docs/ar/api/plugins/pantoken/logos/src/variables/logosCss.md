[pantoken](../../../../../index.md) / [plugins/pantoken/logos/src](../index.md) / logosCss

# Variable: logosCss

> `const` **logosCss**: `string` = `LOGOS_CSS`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

جدول الأنماط الجاهز للاستخدام (نفس النص مثل `./logos.css`).

## Example

**ضمّن رموز الشعار في صفحة**

```ts
import { logosCss } from "@pantoken/plugin-logos";

document.head.insertAdjacentHTML("beforeend", `<style>${logosCss}</style>`);
// then in CSS: background-image: var(--instui-logo-canvas-horizontal-full-color);
```
