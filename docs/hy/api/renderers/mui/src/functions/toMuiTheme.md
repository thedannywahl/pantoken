[pantoken](../../../../index.md) / [renderers/mui/src](../index.md) / toMuiTheme

# Ֆունկցիա: toMuiTheme()

> **toMuiTheme**(`tokens`, `mode?`): [`PantokenThemeOptions`](../interfaces/PantokenThemeOptions.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Կառուցել MUI թեմայական ընտրանքներ տոկեն IR-ից:

## Պարամետրեր

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

IR (օր. `@pantoken/tokens`-ից):

### mode?

[`Mode`](../../../../packages/core/src/type-aliases/Mode.md) = `"light"`

Որ գույնի ռեժիմ լուծել (լռելյայն `"light"`).

## Վերադարձվող արժեք

[`PantokenThemeOptions`](../interfaces/PantokenThemeOptions.md)

Ընտրանքներ MUI-ի `createTheme`-ի համար պատրաստ:

## Օրինակ

**Բրենդի անդամ, ռեժիմի անդամ թեմա**

```ts
import { createTheme } from "@mui/material/styles";
import { toMuiTheme } from "@pantoken/mui";
import { byTheme } from "@pantoken/tokens";

const darkCanvas = createTheme(toMuiTheme(byTheme("canvas"), "dark"));
```
