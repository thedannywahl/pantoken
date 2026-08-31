[pantoken](../../../../index.md) / [renderers/mui/src](../index.md) / toMuiTheme

# Function: toMuiTheme()

> **toMuiTheme**(`tokens`, `mode?`): [`PantokenThemeOptions`](../interfaces/PantokenThemeOptions.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

بناء خيارات موضوع MUI من IR للرمز.

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

IR (على سبيل المثال من `@pantoken/tokens`).

### mode?

[`Mode`](../../../../packages/core/src/type-aliases/Mode.md) = `"light"`

أي وضع ألوان سيتم تحديده (الافتراضي `"light"`).

## Returns

[`PantokenThemeOptions`](../interfaces/PantokenThemeOptions.md)

خيارات جاهزة ل `createTheme` من MUI.

## Example

**موضوع لكل علامة تجارية، لكل وضع**

```ts
import { createTheme } from "@mui/material/styles";
import { toMuiTheme } from "@pantoken/mui";
import { byTheme } from "@pantoken/tokens";

const darkCanvas = createTheme(toMuiTheme(byTheme("canvas"), "dark"));
```
