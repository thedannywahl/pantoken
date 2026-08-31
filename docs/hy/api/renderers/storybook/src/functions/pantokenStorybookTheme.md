[pantoken](../../../../index.md) / [renderers/storybook/src](../index.md) / pantokenStorybookTheme

# Function: pantokenStorybookTheme()

> **pantokenStorybookTheme**(`mode?`): [`StorybookTheme`](../type-aliases/StorybookTheme.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Կառուցել Storybook թեման Instructure նշաններից:

## Parameters

### mode?

[`Mode`](../../../../packages/core/src/type-aliases/Mode.md) = `"light"`

`"light"` կամ `"dark"` (լռելյայն `"light"`):

## Returns

[`StorybookTheme`](../type-aliases/StorybookTheme.md)

`ThemeVars` ձևի օբյեկտ:

## Example

```ts
// .storybook/manager.ts
import { addons } from "@storybook/manager-api";
import { pantokenStorybookTheme } from "@pantoken/storybook";

addons.setConfig({ theme: pantokenStorybookTheme("dark") });
```
