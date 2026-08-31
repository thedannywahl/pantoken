[pantoken](../../../../index.md) / [renderers/css-in-js/src](../index.md) / toStyledTheme

# Function: toStyledTheme()

> **toStyledTheme**(`tokens`, `options?`): [`StyledTheme`](../type-aliases/StyledTheme.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

بناء كائن موضوع CSS-in-JS من IR رمز.

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

IR (على سبيل المثال من `@pantoken/tokens`).

### options?

[`ToStyledThemeOptions`](../interfaces/ToStyledThemeOptions.md) = `{}`

[ToStyledThemeOptions](../interfaces/ToStyledThemeOptions.md).

## Returns

[`StyledTheme`](../type-aliases/StyledTheme.md)

كائن الموضوع، المفتاح حسب اسم الرمز camelCased.

## Examples

**مدعوم بـ var()، تدفقات light/dark من خلال @pantoken/css**

```ts
import { toStyledTheme } from "@pantoken/css-in-js";
import { tokens } from "@pantoken/tokens";

const theme = toStyledTheme(tokens);
// theme.colorBackgroundBrand → "var(--instui-color-background-brand)"
```

**خبز قيم وضع واحد ملموسة (لـ SSR بدون متغيرات CSS)**

```ts
import { toStyledTheme } from "@pantoken/css-in-js";
import { tokens } from "@pantoken/tokens";

const dark = toStyledTheme(tokens, { resolve: "dark" });
// dark.colorBackgroundBase → a concrete value, not a var()
```
