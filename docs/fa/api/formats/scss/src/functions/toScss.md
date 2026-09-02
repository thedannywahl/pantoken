[pantoken](../../../../index.md) / [formats/scss/src](../index.md) / toScss

# تابع: toScss()

> **toScss**(`tokens`, `options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجربی</span>

Emit SCSS variables for a token IR.

## پارامترها

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

The IR (e.g. from `@pantoken/tokens`).

### options?

[`ToScssOptions`](../interfaces/ToScssOptions.md) = `{}`

[ToScssOptions](../interfaces/ToScssOptions.md).

## مقدار بازگشتی

`string`

The SCSS source string.

## نمونه‌ها

**Emit the default (light) variables**

```ts
import { toScss } from "@pantoken/scss";
import { tokens } from "@pantoken/tokens";

toScss(tokens); // "$instui-color-brand: #0374b5;\n…"
```

**Resolve the dark mode of another theme**

```ts
import { toScss } from "@pantoken/scss";
import { byTheme } from "@pantoken/tokens";

toScss(byTheme("canvas"), { mode: "dark" });
```
