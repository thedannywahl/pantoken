[pantoken](../../../../index.md) / [renderers/mui/src](../index.md) / toMuiTheme

# 函数: toMuiTheme()

> **toMuiTheme**(`tokens`, `mode?`): [`PantokenThemeOptions`](../interfaces/PantokenThemeOptions.md)

<span class="instui-pill -color-danger pantoken-doc-tag">实验性</span>

Build MUI theme options from a token IR.

## 参数

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

The IR (e.g. from `@pantoken/tokens`).

### mode?

[`Mode`](../../../../packages/core/src/type-aliases/Mode.md) = `"light"`

Which colour mode to resolve (default `"light"`).

## 返回值

[`PantokenThemeOptions`](../interfaces/PantokenThemeOptions.md)

Options ready for MUI's `createTheme`.

## 示例

**Per-brand, per-mode theme**

```ts
import { createTheme } from "@mui/material/styles";
import { toMuiTheme } from "@pantoken/mui";
import { byTheme } from "@pantoken/tokens";

const darkCanvas = createTheme(toMuiTheme(byTheme("canvas"), "dark"));
```
