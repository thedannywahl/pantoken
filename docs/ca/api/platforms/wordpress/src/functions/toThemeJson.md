[pantoken](../../../../index.md) / [platforms/wordpress/src](../index.md) / toThemeJson

# Funció: toThemeJson()

> **toThemeJson**(`tokens`, `options?`): [`ThemeJson`](../interfaces/ThemeJson.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Converteix una llista de tokens IR a `theme.json` de WordPress.

## Paràmetres

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

La IR (p. ex. de `@pantoken/tokens`).

### options?

[`ToThemeJsonOptions`](../interfaces/ToThemeJsonOptions.md) = `{}`

[ToThemeJsonOptions](../interfaces/ToThemeJsonOptions.md).

## Retorna

[`ThemeJson`](../interfaces/ThemeJson.md)

Un document `theme.json`.

## Exemples

**Converteix un IR a un theme.json en mode clar**

```ts
import { toThemeJson } from "@pantoken/wordpress";
import { byTheme } from "@pantoken/tokens";

const doc = toThemeJson(byTheme("rebrand"));
doc.settings.color.palette; // [{ slug, name, color }, …]
```

**Mode fosc**

```ts
import { toThemeJson } from "@pantoken/wordpress";
import { byTheme } from "@pantoken/tokens";

const doc = toThemeJson(byTheme("canvas"), { mode: "dark" });
```
