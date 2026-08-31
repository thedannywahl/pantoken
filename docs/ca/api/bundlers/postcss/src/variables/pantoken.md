[pantoken](../../../../index.md) / [bundlers/postcss/src](../index.md) / pantoken

# Variable: pantoken

> `const` **pantoken**: \{(`options?`): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

El connector PostCSS de pantoken.

## Type Declaration

## Parameters

### options?

[`PantokenPostcssOptions`](../interfaces/PantokenPostcssOptions.md)

[PantokenPostcssOptions](../interfaces/PantokenPostcssOptions.md).

## Returns

[`Plugin`](https://postcss.org/api/#plugin)

Un [connector](https://postcss.org/api/#plugin) de PostCSS.

### postcss

> **postcss**: `true`

Marcador requerida del connector de PostCSS.

## Examples

**Registreu el connector a postcss.config.js**

```js
import pantoken from "@pantoken/postcss";

export default { plugins: [pantoken()] };
// In your entry stylesheet, `@pantoken;` expands to the token stylesheet.
```

**Expandiu una regla at personalitzada (atRule: "instui" en lloc del valor per defecte)**

```js
import { pantoken } from "@pantoken/postcss";

export default { plugins: [pantoken({ atRule: "instui" })] };
```
