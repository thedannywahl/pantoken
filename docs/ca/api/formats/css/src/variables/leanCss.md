[pantoken](../../../../index.md) / [formats/css/src](../index.md) / leanCss

# Variable: leanCss

> `const` **leanCss**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

La cadena de fulla d'estil lleugera `rebrand` — la fulla completa menys els tokens de glifo de `--instui-icon-*` (els ~1.777 data-URIs d'icona que conformen la majoria de [css](css.md)). Aproximadament la sisena part de la mida per cable; la base recomanada per a la lliurament de CDN/embed. Els components fan referència a només un grapat d'icones, enviades per separat com a `@pantoken/components`'s `component-icons.css`; els consumidors que utilitzin `var(--instui-icon-*)` àmpliament haurien de carregar el [css](css.md) complet (o la fulla de glifo de `icons.css`). Veure `@pantoken/css/style.lean.css`.

## Example

```ts
import { leanCss } from "@pantoken/css";
```
