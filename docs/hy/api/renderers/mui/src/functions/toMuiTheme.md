[pantoken](../../../../index.md) / [renderers/mui/src](../index.md) / toMuiTheme

# Function: toMuiTheme()

> **toMuiTheme**(`tokens`, `mode?`): [`PantokenThemeOptions`](../interfaces/PantokenThemeOptions.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Կառուցել MUI թեմայական ընտրանքներ տոկեն IR-ից:

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

IR (օր. `@pantoken/tokens`-ից):

### mode?

[`Mode`](../../../../packages/core/src/type-aliases/Mode.md) = `"light"`

Որ գույնի ռեժիմ լուծել (լռելյայն `"light"`).

## Returns

[`PantokenThemeOptions`](../interfaces/PantokenThemeOptions.md)

Ընտրանքներ MUI-ի `createTheme`-ի համար պատրաստ:

## Example

**Բրենդի անդամ, ռեժիմի անդամ թեմա**

```ts
import { createTheme } from "@mui/material/styles";
import { toMuiTheme } from "@pantoken/mui";
import { byTheme } from "@pantoken/tokens";

const darkCanvas = createTheme(toMuiTheme(byTheme("canvas"), "dark"));
```
