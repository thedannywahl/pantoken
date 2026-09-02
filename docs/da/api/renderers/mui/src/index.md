[pantoken](../../../index.md) / mui

# mui

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

`@pantoken/mui` — tema MUI (Material UI) med Instructure-tokens.

[toMuiTheme](functions/toMuiTheme.md) kortlægger enhver IR til MUI-temaindstillinger; [lightTheme](variables/lightTheme.md) og [darkTheme](variables/darkTheme.md)
er de færdige `rebrand` indstillinger. Giv dem til MUI's `createTheme`.

## Eksempel

```tsx
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { lightTheme } from "@pantoken/mui";
const theme = createTheme(lightTheme);
<ThemeProvider theme={theme}>...</ThemeProvider>;
```

## Interfaces

- [MuiPaletteColor](interfaces/MuiPaletteColor.md)
- [PantokenThemeOptions](interfaces/PantokenThemeOptions.md)

## Variabler

- [lightTheme](variables/lightTheme.md)
- [darkTheme](variables/darkTheme.md)

## Funktioner

- [toMuiTheme](functions/toMuiTheme.md)

## Referencer

### Mode

Genudsender [Mode](../../../packages/core/src/type-aliases/Mode.md)

***

### default

Omdøber og genudexporterer [lightTheme](variables/lightTheme.md)
