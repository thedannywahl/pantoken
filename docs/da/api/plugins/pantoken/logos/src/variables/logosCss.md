[pantoken](../../../../../index.md) / [plugins/pantoken/logos/src](../index.md) / logosCss

# Variable: logosCss

> `const` **logosCss**: `string` = `LOGOS_CSS`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Det færdiglavede billedtoken-stylesheet (samme tekst som `./logos.css`).

## Example

**Indlæs logoens tokens på en side**

```ts
import { logosCss } from "@pantoken/plugin-logos";

document.head.insertAdjacentHTML("beforeend", `<style>${logosCss}</style>`);
// then in CSS: background-image: var(--instui-logo-canvas-horizontal-full-color);
```
