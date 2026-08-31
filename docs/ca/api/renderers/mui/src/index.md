[pantoken](../../../index.md) / mui

# mui

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/mui` — temàtitza MUI (Material UI) amb tokens d'Instructure.

[toMuiTheme](functions/toMuiTheme.md) assigna qualsevol IR a les opcions de tema MUI; [lightTheme](variables/lightTheme.md) i [darkTheme](variables/darkTheme.md)
són les opcions `rebrand` preelaborades. Passa-les a `createTheme` de MUI.

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

Re-exporta [Mode](../../../packages/core/src/type-aliases/Mode.md)

---

### default

Canvia el nom i re-exporta [lightTheme](variables/lightTheme.md)
