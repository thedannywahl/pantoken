[pantoken](../../../../../index.md) / [plugins/pantoken/logos/src](../index.md) / logosPlugin

# Funktion: logosPlugin()

> **logosPlugin**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Opret logos-pluginnet.

Hooket `css` bidrager med `--instui-logo-*` billedtokens (som `url(data:…)` værdier), så et stylesheet bygget med pluginnet kan referere til ethvert logo gennem `var()`.

## Parametre

### options?

[`LogosOptions`](../interfaces/LogosOptions.md) = `{}`

[LogosOptions](../interfaces/LogosOptions.md).

## Returnerer

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

En [PantokenPlugin](../../../../../packages/core/src/interfaces/PantokenPlugin.md) med en `css` hook.

## Eksempel

**Tilføj logo-billedtokenerne, når du samler CSS gennem toCss**

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import { logosPlugin } from "@pantoken/plugin-logos";

const css = toCss(byTheme("rebrand"), { plugins: [logosPlugin()] });
// then in CSS: background-image: var(--instui-logo-instructure-horizontal-full-color);
```
