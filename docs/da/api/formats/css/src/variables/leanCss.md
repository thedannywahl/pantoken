[pantoken](../../../../index.md) / [formats/css/src](../index.md) / leanCss

# Variable: leanCss

> `const` **leanCss**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Det lean `rebrand` stylesheet-streng — det fulde ark minus `--instui-icon-*` glyph tokens (de
~1.777 ikon data-URIs der udgør det meste af [css](css.md)). Cirka en sjettedel af størrelsen over nettet; det
anbefalet fundament til CDN/embed levering. Komponenter refererer kun til en håndfuld ikoner, sendt
separately som `@pantoken/components`'s `component-icons.css`; forbrugere der bruger `var(--instui-icon-*)`
bredt bør indlæse det fulde [css](css.md) (eller `icons.css` glyph ark). Se
`@pantoken/css/style.lean.css`.

## Example

```ts
import { leanCss } from "@pantoken/css";
```
