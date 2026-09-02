[pantoken](../../../../../index.md) / [plugins/pantoken/logos/src](../index.md) / logosCss

# Փոփոխական: logosCss

> `const` **logosCss**: `string` = `LOGOS_CSS`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Պատրաստ պատկեր-տոկեն բամբակ (նույն տեքստ, ինչ `./logos.css`):

## Օրինակ

**Տեղադրել լոգո տոկեներ էջի մեջ**

```ts
import { logosCss } from "@pantoken/plugin-logos";

document.head.insertAdjacentHTML("beforeend", `<style>${logosCss}</style>`);
// then in CSS: background-image: var(--instui-logo-canvas-horizontal-full-color);
```
