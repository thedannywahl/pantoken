[pantoken](../../../../index.md) / [renderers/storybook/src](../index.md) / pantokenStorybookTheme

# Swyddogaeth: pantokenStorybookTheme()

> **pantokenStorybookTheme**(`mode?`): [`StorybookTheme`](../type-aliases/StorybookTheme.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Arbrofol</span>

Build a Storybook theme from the Instructure tokens.

## Paramedrau

### mode?

[`Mode`](../../../../packages/core/src/type-aliases/Mode.md) = `"light"`

`"light"` or `"dark"` (default `"light"`).

## Yn dychwelyd

[`StorybookTheme`](../type-aliases/StorybookTheme.md)

A `ThemeVars`-shaped object.

## Enghraifft

```ts
// .storybook/manager.ts
import { addons } from "@storybook/manager-api";
import { pantokenStorybookTheme } from "@pantoken/storybook";

addons.setConfig({ theme: pantokenStorybookTheme("dark") });
```
