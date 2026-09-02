[pantoken](../../../../index.md) / [platforms/wordpress/src](../index.md) / toThemeJson

# Funktion: toThemeJson()

> **toThemeJson**(`tokens`, `options?`): [`ThemeJson`](../interfaces/ThemeJson.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Konverter en IR-tokenliste til en WordPress `theme.json`.

## Parametre

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

IR'en (f.eks. fra `@pantoken/tokens`).

### options?

[`ToThemeJsonOptions`](../interfaces/ToThemeJsonOptions.md) = `{}`

[ToThemeJsonOptions](../interfaces/ToThemeJsonOptions.md).

## Returnerer

[`ThemeJson`](../interfaces/ThemeJson.md)

Et `theme.json` dokument.

## Eksempler

**Konverter en IR til et light-mode theme.json**

```ts
import { toThemeJson } from "@pantoken/wordpress";
import { byTheme } from "@pantoken/tokens";

const doc = toThemeJson(byTheme("rebrand"));
doc.settings.color.palette; // [{ slug, name, color }, …]
```

**Mørk tilstand**

```ts
import { toThemeJson } from "@pantoken/wordpress";
import { byTheme } from "@pantoken/tokens";

const doc = toThemeJson(byTheme("canvas"), { mode: "dark" });
```
