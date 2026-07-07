# @pantoken/panda

An Instructure design-token preset for Panda CSS. Spread it into your Panda config to get Instructure
colors, spacing, and radii as Panda tokens, with light and dark handled by Panda's `_dark` condition.

## Install

```sh
npm i -D @pantoken/panda
```

Also available as `pantoken/panda`.

## Usage

```ts
// panda.config.ts
import { defineConfig } from "@pandacss/dev";
import { pantokenPreset } from "@pantoken/panda";

export default defineConfig({
  presets: [pantokenPreset],
});
```

Then reference tokens in your styles:

```ts
css({
  color: "token(colors.color-text-base)",
  background: "token(colors.color-background-base)",
  padding: "token(spacing.spacing-space-sm)",
});
```

## How it maps

Panda splits a design system into raw `tokens` (mode-independent primitives) and `semanticTokens`
(values that vary by condition), and pantoken's IR lines up with that split. Any token that differs
between light and dark becomes `{ value: { base, _dark } }`, so `light-dark()` tokens switch through
Panda's built-in `_dark` condition. Tokens are bucketed into Panda categories by value type and name:
colors, spacing, sizes, radii, fontSizes, fontWeights, lineHeights, durations, and shadows. Icon
tokens are skipped. Keys drop the `--instui-` prefix, so `--instui-color-text-base` becomes
`token(colors.color-text-base)`.

## API

- **`pantokenPreset: PandaPreset`** — the ready-made `rebrand` preset. Also the default export.
- **`toPandaPreset(tokens): PandaPreset`** — builds a preset from any token IR, if you want a
  different theme.
- **`PandaPreset`, `PandaCategory`, `PandaToken`, `PandaSemanticToken`** — the preset shape and its
  supporting types.

## Related

- Pairs with `@pantoken/css` if you want the raw `--instui-*` custom properties alongside Panda.

## License

MIT
