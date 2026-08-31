[pantoken](../../../../../index.md) / [plugins/pantoken/logos/src](../index.md) / logosCss

# Variable: logosCss

> `const` **logosCss**: `string` = `LOGOS_CSS`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

La fulla d'estils de token d'imatge prefabricada (el mateix text que `./logos.css`).

## Example

**Incrustar els tokens del logotip a una pàgina**

```ts
import { logosCss } from "@pantoken/plugin-logos";

document.head.insertAdjacentHTML("beforeend", `<style>${logosCss}</style>`);
// then in CSS: background-image: var(--instui-logo-canvas-horizontal-full-color);
```
