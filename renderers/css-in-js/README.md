# @pantoken/css-in-js

An Instructure theme object for runtime CSS-in-JS libraries. It works with anything that reads a theme from `props.theme` — Emotion, styled-components, and Stitches all share that convention. Keys are camelCased tokens; values are `var(--instui-*)` references by default, so light, dark, and high-contrast switching all flow through the CSS custom properties.

## Install

```sh
npm i @pantoken/css-in-js @pantoken/css
```

You need `@pantoken/css` too. It defines the `--instui-*` custom properties this theme points at.

Also available as `pantoken/cssInJs`.

## Usage

```tsx
import styled, { ThemeProvider } from "styled-components";
import { pantokenTheme } from "@pantoken/css-in-js";

const Button = styled.button`
  background: ${({ theme }) => theme.colorBackgroundBrand};
  color: ${({ theme }) => theme.colorTextOnColor};
`;

export const App = () => <ThemeProvider theme={pantokenTheme}>...</ThemeProvider>;
```

The same object works with Emotion:

```tsx
import { useTheme } from "@emotion/react";
const theme = useTheme();
// theme.colorTextBase → "var(--instui-color-text-base)"
```

Every non-icon token becomes a camelCased key: `--instui-color-background-brand` → `colorBackgroundBrand`. Icons are skipped — use `@pantoken/icons` for those.

To bake concrete values for one mode (for example, server rendering without CSS variables), pass `resolve`:

```ts
import { toStyledTheme } from "@pantoken/css-in-js";
import { tokens } from "@pantoken/tokens";

const dark = toStyledTheme(tokens, { resolve: "dark" });
// dark.colorBackgroundBase → "#000" (a concrete value, not a var())
```

To type `theme.*` in styled-components, augment its `DefaultTheme`:

```ts
import type { StyledTheme } from "@pantoken/css-in-js";

declare module "styled-components" {
  export interface DefaultTheme extends StyledTheme {}
}
```

## API

- **`pantokenTheme: Record<string, string>`** — the ready-made `rebrand` theme object, var()-backed.
- **`toStyledTheme(tokens, options?): StyledTheme`** — build a theme object from a token IR. Pass `{ resolve: "light" | "dark" }` to bake concrete single-mode values instead of var() references.
- **`toThemeKey(name): string`** — turn `--instui-color-background-brand` into `colorBackgroundBrand`.
- **`StyledTheme`** — the theme object type (`Record<string, string>`); augment styled-components' `DefaultTheme` with it.
- **`ToStyledThemeOptions`, `Mode`** — option and mode types.

## Related

- Pairs with `@pantoken/css` for the `--instui-*` custom properties the theme points at.
- Use `@pantoken/icons` for icon tokens, which this theme skips.

## License

MIT
