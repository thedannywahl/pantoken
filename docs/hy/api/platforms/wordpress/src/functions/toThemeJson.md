[pantoken](../../../../index.md) / [platforms/wordpress/src](../index.md) / toThemeJson

# Function: toThemeJson()

> **toThemeJson**(`tokens`, `options?`): [`ThemeJson`](../interfaces/ThemeJson.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

IR տոկենների ցուցակը փոխակերպեք WordPress `theme.json`-ի:

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

IR (օր. `@pantoken/tokens`-ից):

### options?

[`ToThemeJsonOptions`](../interfaces/ToThemeJsonOptions.md) = `{}`

[ToThemeJsonOptions](../interfaces/ToThemeJsonOptions.md).

## Returns

[`ThemeJson`](../interfaces/ThemeJson.md)

Մի `theme.json` փաստաթուղթ:

## Examples

**IR-ը փոխակերպեք light-mode theme.json-ի**

```ts
import { toThemeJson } from "@pantoken/wordpress";
import { byTheme } from "@pantoken/tokens";

const doc = toThemeJson(byTheme("rebrand"));
doc.settings.color.palette; // [{ slug, name, color }, …]
```

**Մութ ռեժիմ**

```ts
import { toThemeJson } from "@pantoken/wordpress";
import { byTheme } from "@pantoken/tokens";

const doc = toThemeJson(byTheme("canvas"), { mode: "dark" });
```
