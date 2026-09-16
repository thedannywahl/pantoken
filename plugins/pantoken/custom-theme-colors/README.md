# `@pantoken/plugin-custom-theme-colors`

A pantoken plugin providing custom theme color rules and variables for site theme color selection across 13 color namespaces (`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`, `aurora`).

## Usage

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import { customThemeColors } from "@pantoken/plugin-custom-theme-colors";

const css = toCss(byTheme("rebrand"), {
  plugins: [customThemeColors()],
});
```

## Preservation Policy

Custom color selection remaps brand primitives only. Explicitly blue accents and semantic status
intents (`info`, `success`, `warning`, and `error`, including pastel status backgrounds) retain
their source-theme values so color selection never changes their meaning.
