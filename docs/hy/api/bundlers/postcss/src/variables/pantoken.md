[pantoken](../../../../index.md) / [bundlers/postcss/src](../index.md) / pantoken

# Փոփոխական: pantoken

> `const` **pantoken**: \{(`options?`): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Pantoken PostCSS plugin-ը:

## Type Declaration

## Պարամետրեր

### options?

[`PantokenPostcssOptions`](../interfaces/PantokenPostcssOptions.md)

[PantokenPostcssOptions](../interfaces/PantokenPostcssOptions.md).

## Վերադարձվող արժեք

[`Plugin`](https://postcss.org/api/#plugin)

PostCSS [Plugin](https://postcss.org/api/#plugin):

### postcss

> **postcss**: `true`

Պահանջվող PostCSS plugin նշիչ:

## Օրինակներ

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
