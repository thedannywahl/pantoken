[pantoken](../../../index.md) / mui

# mui

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

`@pantoken/mui` — թեմա MUI (Material UI) Instructure տոկեններով:

[toMuiTheme](functions/toMuiTheme.md) ցանկացած IR-ը գծապատկերում է MUI թեմայի տարբերակների վրա; [lightTheme](variables/lightTheme.md) և [darkTheme](variables/darkTheme.md)
պատրաստ `rebrand` տարբերակներ են: Փոխանցեք դրանք MUI-ի `createTheme`-ին:

## Օրինակ

```tsx
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { lightTheme } from "@pantoken/mui";
const theme = createTheme(lightTheme);
<ThemeProvider theme={theme}>...</ThemeProvider>;
```

## Ինտերֆեյսներ

- [MuiPaletteColor](interfaces/MuiPaletteColor.md)
- [PantokenThemeOptions](interfaces/PantokenThemeOptions.md)

## Փոփոխականներ

- [lightTheme](variables/lightTheme.md)
- [darkTheme](variables/darkTheme.md)

## Ֆունկցիաներ

- [toMuiTheme](functions/toMuiTheme.md)

## Հղումներ

### Mode

Վերաառաքել [Mode](../../../packages/core/src/type-aliases/Mode.md)

***

### default

Վերանվանում և վերաարտահանում [lightTheme](variables/lightTheme.md)
