[pantoken](../../../../index.md) / [bundlers/postcss/src](../index.md) / pantoken

# Variable: pantoken

> `const` **pantoken**: \{(`options?`): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

مكون pantoken الإضافي PostCSS.

## Type Declaration

## Parameters

### options?

[`PantokenPostcssOptions`](../interfaces/PantokenPostcssOptions.md)

[PantokenPostcssOptions](../interfaces/PantokenPostcssOptions.md).

## Returns

[`Plugin`](https://postcss.org/api/#plugin)

مكون إضافي PostCSS [Plugin](https://postcss.org/api/#plugin).

### postcss

> **postcss**: `true`

علامة المكون الإضافي PostCSS المطلوبة.

## Examples

**سجل المكون الإضافي في postcss.config.js**

```js
import pantoken from "@pantoken/postcss";

export default { plugins: [pantoken()] };
// In your entry stylesheet, `@pantoken;` expands to the token stylesheet.
```

**وسّع قاعدة at-rule مخصصة (atRule: "instui" بدلاً من الافتراضي)**

```js
import { pantoken } from "@pantoken/postcss";

export default { plugins: [pantoken({ atRule: "instui" })] };
```
