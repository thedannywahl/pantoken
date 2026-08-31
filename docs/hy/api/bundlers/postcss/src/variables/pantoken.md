[pantoken](../../../../index.md) / [bundlers/postcss/src](../index.md) / pantoken

# Variable: pantoken

> `const` **pantoken**: \{(`options?`): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Pantoken PostCSS plugin-ը:

## Type Declaration

## Parameters

### options?

[`PantokenPostcssOptions`](../interfaces/PantokenPostcssOptions.md)

[PantokenPostcssOptions](../interfaces/PantokenPostcssOptions.md).

## Returns

[`Plugin`](https://postcss.org/api/#plugin)

PostCSS [Plugin](https://postcss.org/api/#plugin):

### postcss

> **postcss**: `true`

Պահանջվող PostCSS plugin նշիչ:

## Examples

**Գրանցեք plugin-ը postcss.config.js-ում**

```js
import pantoken from "@pantoken/postcss";

export default { plugins: [pantoken()] };
// In your entry stylesheet, `@pantoken;` expands to the token stylesheet.
```

**Ընդլայնել հատուկ at-rule (atRule: "instui" լռելյայնի փոխարեն)**

```js
import { pantoken } from "@pantoken/postcss";

export default { plugins: [pantoken({ atRule: "instui" })] };
```
