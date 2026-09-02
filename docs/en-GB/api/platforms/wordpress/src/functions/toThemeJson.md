[pantoken](../../../../index.md) / [platforms/wordpress/src](../index.md) / toThemeJson

# Function: toThemeJson()

> **toThemeJson**(`tokens`, `options?`): [`ThemeJson`](../interfaces/ThemeJson.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Convert an IR token list into a WordPress `theme.json`.

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

The IR (e.g. from `@pantoken/tokens`).

### options?

[`ToThemeJsonOptions`](../interfaces/ToThemeJsonOptions.md) = `{}`

[ToThemeJsonOptions](../interfaces/ToThemeJsonOptions.md).

## Returns

[`ThemeJson`](../interfaces/ThemeJson.md)

A `theme.json` document.

## Examples

**Convert an IR to a light-mode theme.json**

```ts
import { toThemeJson } from "@pantoken/wordpress";
import { byTheme } from "@pantoken/tokens";

const doc = toThemeJson(byTheme("rebrand"));
doc.settings.color.palette; // [{ slug, name, color }, …]
```

**Dark mode**

```ts
import { toThemeJson } from "@pantoken/wordpress";
import { byTheme } from "@pantoken/tokens";

const doc = toThemeJson(byTheme("canvas"), { mode: "dark" });
```
