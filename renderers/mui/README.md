# @pantoken/mui

Theme MUI (Material UI) with Instructure tokens. It maps the token IR onto MUI theme options you pass straight to `createTheme`, covering the palette, background, text, divider, and border radius.

## Install

```sh
npm i @pantoken/mui
```

MUI itself is a peer, so bring your own `@mui/material`.

Also available as `pantoken/mui`.

## Usage

```tsx
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { lightTheme } from "@pantoken/mui";

const theme = createTheme(lightTheme);

export const App = () => <ThemeProvider theme={theme}>...</ThemeProvider>;
```

Build options from any IR and mode yourself:

```ts
import { toMuiTheme } from "@pantoken/mui";
import { byTheme } from "@pantoken/tokens";

const options = toMuiTheme(byTheme("canvas"), "dark");
```

MUI derives hover and active shades, plus contrast text, from each palette color, so the values here are resolved to concrete colors for one mode. Generate a light theme and a dark theme, then let MUI switch between them with `palette.mode`.

The mapping covers `palette.primary`, `secondary`, `error`, `warning`, `info`, and `success`, plus `background`, `text`, `divider`, and `shape.borderRadius`. It doesn't cover typography or component overrides yet. Values are concrete colors, not `var(--instui-*)` references, because MUI can't augment a color it can't parse. The return type is structurally a MUI `ThemeOptions`, and this package has no runtime dependency on MUI.

## API

- **`lightTheme` / `darkTheme`** — ready-made `rebrand` MUI options for each mode.
- **`toMuiTheme(tokens, mode?): PantokenThemeOptions`** — build MUI theme options from a token IR. `mode` defaults to `"light"`.
- **`PantokenThemeOptions`** — the subset of MUI `ThemeOptions` this package emits (structurally assignable to MUI's type).
- **`MuiPaletteColor`, `Mode`** — a palette color entry and the color mode type.

## Related

- Pull IRs from `@pantoken/tokens` (for example `byTheme("canvas")`) to build per-brand themes.

## License

MIT
