[pantoken](../../../../index.md) / [renderers/mui/src](../index.md) / toMuiTheme

# 函式: toMuiTheme()

> **toMuiTheme**(`tokens`, `mode?`): [`PantokenThemeOptions`](../interfaces/PantokenThemeOptions.md)

<span class="instui-pill -color-danger pantoken-doc-tag">實驗性</span>

Build MUI theme options from a token IR.

## 參數

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

The IR (e.g. from `@pantoken/tokens`).

### mode?

[`Mode`](../../../../packages/core/src/type-aliases/Mode.md) = `"light"`

Which colour mode to resolve (default `"light"`).

## 回傳

[`PantokenThemeOptions`](../interfaces/PantokenThemeOptions.md)

Options ready for MUI's `createTheme`.

## 範例

**Per-brand, per-mode theme**

```ts
import { createTheme } from "@mui/material/styles";
import { toMuiTheme } from "@pantoken/mui";
import { byTheme } from "@pantoken/tokens";

const darkCanvas = createTheme(toMuiTheme(byTheme("canvas"), "dark"));
```
