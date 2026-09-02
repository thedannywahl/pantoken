[pantoken](../../../index.md) / mui

# mui

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimantal</span>

`@pantoken/mui` — theme MUI (Material UI) with Instructure tokens.

[toMuiTheme](functions/toMuiTheme.md) maps any IR onto MUI theme options; [lightTheme](variables/lightTheme.md) and [darkTheme](variables/darkTheme.md)
are the ready-made `rebrand` options. Pass them to MUI's `createTheme`.

## Egzanp

```tsx
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { lightTheme } from "@pantoken/mui";
const theme = createTheme(lightTheme);
<ThemeProvider theme={theme}>...</ThemeProvider>;
```

## Entèfas

- [MuiPaletteColor](interfaces/MuiPaletteColor.md)
- [PantokenThemeOptions](interfaces/PantokenThemeOptions.md)

## Varyab

- [lightTheme](variables/lightTheme.md)
- [darkTheme](variables/darkTheme.md)

## Fonksyon

- [toMuiTheme](functions/toMuiTheme.md)

## Referans

### Mode

Re-exports [Mode](../../../packages/core/src/type-aliases/Mode.md)

***

### default

Renames and re-exports [lightTheme](variables/lightTheme.md)
