[pantoken](../../../index.md) / mui

# mui

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

`@pantoken/mui` — سمة MUI (Material UI) مع توكنات Instructure.

[toMuiTheme](functions/toMuiTheme.md) يحول أي IR إلى خيارات سمة MUI؛ [lightTheme](variables/lightTheme.md) و [darkTheme](variables/darkTheme.md)
هما خيارات `rebrand` الجاهزة. مرّرها إلى `createTheme` الخاص بـ MUI.

## مثال

```tsx
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { lightTheme } from "@pantoken/mui";
const theme = createTheme(lightTheme);
<ThemeProvider theme={theme}>...</ThemeProvider>;
```

## واجهات

- [MuiPaletteColor](interfaces/MuiPaletteColor.md)
- [PantokenThemeOptions](interfaces/PantokenThemeOptions.md)

## المتغيرات

- [lightTheme](variables/lightTheme.md)
- [darkTheme](variables/darkTheme.md)

## الدوال

- [toMuiTheme](functions/toMuiTheme.md)

## المراجع

### Mode

يعيد تصدير [Mode](../../../packages/core/src/type-aliases/Mode.md)

***

### default

يعيد تسمية ويعيد تصدير [lightTheme](variables/lightTheme.md)
