[pantoken](../../../../index.md) / [renderers/mui/src](../index.md) / toMuiTheme

# تابع: toMuiTheme()

> **toMuiTheme**(`tokens`, `mode?`): [`PantokenThemeOptions`](../interfaces/PantokenThemeOptions.md)

<span class="instui-pill -color-danger pantoken-doc-tag">تجربی</span>

Build MUI theme options from a token IR.

## پارامترها

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

The IR (e.g. from `@pantoken/tokens`).

### mode?

[`Mode`](../../../../packages/core/src/type-aliases/Mode.md) = `"light"`

Which colour mode to resolve (default `"light"`).

## مقدار بازگشتی

[`PantokenThemeOptions`](../interfaces/PantokenThemeOptions.md)

Options ready for MUI's `createTheme`.

## نمونه

**Per-brand, per-mode theme**

```ts
import { createTheme } from "@mui/material/styles";
import { toMuiTheme } from "@pantoken/mui";
import { byTheme } from "@pantoken/tokens";

const darkCanvas = createTheme(toMuiTheme(byTheme("canvas"), "dark"));
```
