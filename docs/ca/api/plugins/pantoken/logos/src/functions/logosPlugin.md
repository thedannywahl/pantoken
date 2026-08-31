[pantoken](../../../../../index.md) / [plugins/pantoken/logos/src](../index.md) / logosPlugin

# Function: logosPlugin()

> **logosPlugin**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Crea el connector de logotips.

El ganxo `css` contribueix els tokens d'imatge `--instui-logo-*` (com a valors `url(data:…)`), de manera que una
fulla d'estils construïda amb el connector pot fer referència a qualsevol logotip a través de `var()`.

## Parameters

### options?

[`LogosOptions`](../interfaces/LogosOptions.md) = `{}`

[LogosOptions](../interfaces/LogosOptions.md).

## Returns

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

Un [PantokenPlugin](../../../../../packages/core/src/interfaces/PantokenPlugin.md) amb un ganxo `css`.

## Example

**Afegiu els tokens de la imatge del logotip quan assembleu CSS mitjançant toCss**

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import { logosPlugin } from "@pantoken/plugin-logos";

const css = toCss(byTheme("rebrand"), { plugins: [logosPlugin()] });
// then in CSS: background-image: var(--instui-logo-instructure-horizontal-full-color);
```
