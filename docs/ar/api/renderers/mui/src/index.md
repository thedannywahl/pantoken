[pantoken](../../../index.md) / mui

# mui

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/mui` — ضع مظهر MUI (Material UI) برموز Instructure.

[toMuiTheme](functions/toMuiTheme.md) يعين أي IR إلى خيارات موضوع MUI؛ [lightTheme](variables/lightTheme.md) و [darkTheme](variables/darkTheme.md)
هي خيارات `rebrand` الجاهزة. مررها إلى `createTheme` الخاص بـ MUI.

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

إعادة تصدير [Mode](../../../packages/core/src/type-aliases/Mode.md)

---

### default

إعادة تسمية وإعادة تصدير [lightTheme](variables/lightTheme.md)
