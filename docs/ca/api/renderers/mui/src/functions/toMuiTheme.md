[pantoken](../../../../index.md) / [renderers/mui/src](../index.md) / toMuiTheme

# Function: toMuiTheme()

> **toMuiTheme**(`tokens`, `mode?`): [`PantokenThemeOptions`](../interfaces/PantokenThemeOptions.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Construeix les opcions de temàtica de MUI a partir d'un IR de token.

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

La IR (p. ex. de `@pantoken/tokens`).

### mode?

[`Mode`](../../../../packages/core/src/type-aliases/Mode.md) = `"light"`

Quin mode de color resoldre (per defecte `"light"`).

## Returns

[`PantokenThemeOptions`](../interfaces/PantokenThemeOptions.md)

Opcions preparades per a `createTheme` de MUI.

## Example

**Temàtica per marca, per mode**

```ts
import { createTheme } from "@mui/material/styles";
import { toMuiTheme } from "@pantoken/mui";
import { byTheme } from "@pantoken/tokens";

const darkCanvas = createTheme(toMuiTheme(byTheme("canvas"), "dark"));
```
