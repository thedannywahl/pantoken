[pantoken](../../../../index.md) / [renderers/css-in-js/src](../index.md) / toStyledTheme

# دالة: toStyledTheme()

> **toStyledTheme**(`tokens`, `options?`): [`StyledTheme`](../type-aliases/StyledTheme.md)

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

بناء كائن موضوع (theme) لـ CSS-in-JS من تمثيل وسيط للرموز (token IR).

## المعلمات

### tokens

للقراءة فقط [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

الـ IR (على سبيل المثال من `@pantoken/tokens`).

### options?

[`ToStyledThemeOptions`](../interfaces/ToStyledThemeOptions.md) = `{}`

[ToStyledThemeOptions](../interfaces/ToStyledThemeOptions.md).

## القيم المرجعة

[`StyledTheme`](../type-aliases/StyledTheme.md)

كائن السمة، مفاتيحه هي أسماء الرموز بتنسيق camelCase.

## أمثلة

**مدعومة بواسطة var() — تدفقات فاتح/داكن عبر @pantoken/css**

```ts
import { toStyledTheme } from "@pantoken/css-in-js";
import { tokens } from "@pantoken/tokens";

const theme = toStyledTheme(tokens);
// theme.colorBackgroundBrand → "var(--instui-color-background-brand)"
```

**حفظ قيم أحادية الوضع الثابتة (لـ SSR بدون متغيرات CSS)**

```ts
import { toStyledTheme } from "@pantoken/css-in-js";
import { tokens } from "@pantoken/tokens";

const dark = toStyledTheme(tokens, { resolve: "dark" });
// dark.colorBackgroundBase → a concrete value, not a var()
```
