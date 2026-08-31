[pantoken](../../../index.md) / mui

# mui

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/mui` — թեմա MUI (Material UI) Instructure տոկեններով:

[toMuiTheme](functions/toMuiTheme.md) ցանկացած IR-ը գծապատկերում է MUI թեմայի տարբերակների վրա; [lightTheme](variables/lightTheme.md) և [darkTheme](variables/darkTheme.md)
պատրաստ `rebrand` տարբերակներ են: Փոխանցեք դրանք MUI-ի `createTheme`-ին:

## Example

```tsx
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { lightTheme } from "@pantoken/mui";
const theme = createTheme(lightTheme);
<ThemeProvider theme={theme}>...</ThemeProvider>;
```

## Interfaces

- [MuiPaletteColor](interfaces/MuiPaletteColor.md)
- [PantokenThemeOptions](interfaces/PantokenThemeOptions.md)

## Variables

- [lightTheme](variables/lightTheme.md)
- [darkTheme](variables/darkTheme.md)

## Functions

- [toMuiTheme](functions/toMuiTheme.md)

## References

### Mode

Վերաառաքել [Mode](../../../packages/core/src/type-aliases/Mode.md)

---

### default

Վերանվանում և վերաարտահանում [lightTheme](variables/lightTheme.md)
