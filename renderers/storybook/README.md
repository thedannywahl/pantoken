# @pantoken/storybook

A Storybook theme built from Instructure tokens. It maps the token IR onto a Storybook `ThemeVars`
object with colors resolved concretely, so your Storybook manager and preview pick up the
Instructure look.

## Install

```sh
npm i @pantoken/storybook
```

`@storybook/theming` is an optional peer — this package returns a plain object, so you don't need it
installed to build a theme.

Also available as `pantoken/storybook`.

## Usage

```ts
// .storybook/manager.ts
import { addons } from "@storybook/manager-api";
import { pantokenStorybookTheme } from "@pantoken/storybook";

addons.setConfig({ theme: pantokenStorybookTheme("light") });
```

Pass `"dark"` for the dark palette. The result is a plain `ThemeVars`-shaped object with colors
resolved to concrete values.

## API

- **`pantokenStorybookTheme(mode?): StorybookTheme`** — build a Storybook theme from the Instructure
  tokens. `mode` is `"light"` or `"dark"` (default `"light"`).
- **`StorybookTheme`** — the returned object type (a subset of Storybook's `ThemeVars`).

## License

MIT
