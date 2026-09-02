[pantoken](../../../../index.md) / [renderers/storybook/src](../index.md) / pantokenStorybookTheme

# Funktion: pantokenStorybookTheme()

> **pantokenStorybookTheme**(`mode?`): [`StorybookTheme`](../type-aliases/StorybookTheme.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Opret et Storybook-tema ud fra Instructure-tokens.

## Parametre

### mode?

[`Mode`](../../../../packages/core/src/type-aliases/Mode.md) = `"light"`

`"light"` eller `"dark"` (standard `"light"`).

## Returnerer

[`StorybookTheme`](../type-aliases/StorybookTheme.md)

Et `ThemeVars`-formet objekt.

## Eksempel

```ts
// .storybook/manager.ts
import { addons } from "@storybook/manager-api";
import { pantokenStorybookTheme } from "@pantoken/storybook";

addons.setConfig({ theme: pantokenStorybookTheme("dark") });
```
