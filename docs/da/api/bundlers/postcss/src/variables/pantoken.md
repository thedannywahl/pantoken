[pantoken](../../../../index.md) / [bundlers/postcss/src](../index.md) / pantoken

# Variable: pantoken

> `const` **pantoken**: \{(`options?`): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Pantoken PostCSS pluginet.

## Type Declaration

## Parameters

### options?

[`PantokenPostcssOptions`](../interfaces/PantokenPostcssOptions.md)

[PantokenPostcssOptions](../interfaces/PantokenPostcssOptions.md).

## Returns

[`Plugin`](https://postcss.org/api/#plugin)

Et PostCSS [Plugin](https://postcss.org/api/#plugin).

### postcss

> **postcss**: `true`

Påkrævet PostCSS plugin marker.

## Examples

**Registrer pluginet i postcss.config.js**

```js
import pantoken from "@pantoken/postcss";

export default { plugins: [pantoken()] };
// In your entry stylesheet, `@pantoken;` expands to the token stylesheet.
```

**Udvid et brugerdefineret at-regel (atRule: "instui" i stedet for standarden)**

```js
import { pantoken } from "@pantoken/postcss";

export default { plugins: [pantoken({ atRule: "instui" })] };
```
