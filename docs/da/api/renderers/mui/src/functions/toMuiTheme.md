[pantoken](../../../../index.md) / [renderers/mui/src](../index.md) / toMuiTheme

# Function: toMuiTheme()

> **toMuiTheme**(`tokens`, `mode?`): [`PantokenThemeOptions`](../interfaces/PantokenThemeOptions.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Byg MUI temaindstillinger fra en token IR.

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

IR'en (f.eks. fra `@pantoken/tokens`).

### mode?

[`Mode`](../../../../packages/core/src/type-aliases/Mode.md) = `"light"`

Hvilken farvetilstand skal løses (standard `"light"`).

## Returns

[`PantokenThemeOptions`](../interfaces/PantokenThemeOptions.md)

Indstillinger klar til MUI's `createTheme`.

## Example

**Per-mærke, per-tilstand tema**

```ts
import { createTheme } from "@mui/material/styles";
import { toMuiTheme } from "@pantoken/mui";
import { byTheme } from "@pantoken/tokens";

const darkCanvas = createTheme(toMuiTheme(byTheme("canvas"), "dark"));
```
