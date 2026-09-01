[pantoken](../../../../index.md) / [renderers/mui/src](../index.md) / toMuiTheme

# دالة: toMuiTheme()

> **toMuiTheme**(`tokens`, `mode?`): [`PantokenThemeOptions`](../interfaces/PantokenThemeOptions.md)

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

بناء خيارات سمة MUI من IR للرموز.

## المعلمات

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

الـ IR (على سبيل المثال من `@pantoken/tokens`).

### mode?

[`Mode`](../../../../packages/core/src/type-aliases/Mode.md) = `"light"`

أي وضع ألوان يجب حله (الافتراضي `"light"`).

## القيم المرجعة

[`PantokenThemeOptions`](../interfaces/PantokenThemeOptions.md)

خيارات جاهزة لـ `createTheme` الخاص بـ MUI.

## مثال

**سمة لكل علامة تجارية ولكل وضع**

```ts
import { createTheme } from "@mui/material/styles";
import { toMuiTheme } from "@pantoken/mui";
import { byTheme } from "@pantoken/tokens";

const darkCanvas = createTheme(toMuiTheme(byTheme("canvas"), "dark"));
```
