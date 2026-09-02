[pantoken](../../../index.md) / mui

# mui

<span class="instui-pill -color-danger pantoken-doc-tag">تجربی</span>

`@pantoken/mui` — theme MUI (Material UI) with Instructure tokens.

[toMuiTheme](functions/toMuiTheme.md) maps any IR onto MUI theme options; [lightTheme](variables/lightTheme.md) and [darkTheme](variables/darkTheme.md)
are the ready-made `rebrand` options. Pass them to MUI's `createTheme`.

## نمونه

```tsx
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { lightTheme } from "@pantoken/mui";
const theme = createTheme(lightTheme);
<ThemeProvider theme={theme}>...</ThemeProvider>;
```

## رابط‌ها

- [MuiPaletteColor](interfaces/MuiPaletteColor.md)
- [PantokenThemeOptions](interfaces/PantokenThemeOptions.md)

## متغیرها

- [lightTheme](variables/lightTheme.md)
- [darkTheme](variables/darkTheme.md)

## توابع

- [toMuiTheme](functions/toMuiTheme.md)

## ارجاعات

### Mode

Re-exports [Mode](../../../packages/core/src/type-aliases/Mode.md)

***

### default

Renames and re-exports [lightTheme](variables/lightTheme.md)
