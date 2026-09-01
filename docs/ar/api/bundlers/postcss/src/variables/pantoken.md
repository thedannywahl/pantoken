[pantoken](../../../../index.md) / [bundlers/postcss/src](../index.md) / pantoken

# متغير: pantoken

> `const` **pantoken**: \{(`options?`): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

إضافة pantoken لـ PostCSS.

## Type Declaration

## المعلمات

### options?

[`PantokenPostcssOptions`](../interfaces/PantokenPostcssOptions.md)

[PantokenPostcssOptions](../interfaces/PantokenPostcssOptions.md).

## القيم المرجعة

[`Plugin`](https://postcss.org/api/#plugin)

إضافة PostCSS [Plugin](https://postcss.org/api/#plugin).

### postcss

> **postcss**: `true`

علامة المكوّن الإضافي المطلوبة لـ PostCSS.

## أمثلة

**سجِّل الإضافة في postcss.config.js**

```js
import pantoken from "@pantoken/postcss";

export default { plugins: [pantoken()] };
// In your entry stylesheet, `@pantoken;` expands to the token stylesheet.
```

**توسيع at-rule مخصص (atRule: "instui" بدلاً من الافتراضي)**

```js
import { pantoken } from "@pantoken/postcss";

export default { plugins: [pantoken({ atRule: "instui" })] };
```
