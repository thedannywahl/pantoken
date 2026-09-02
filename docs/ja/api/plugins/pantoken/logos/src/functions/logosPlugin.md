[pantoken](../../../../../index.md) / [plugins/pantoken/logos/src](../index.md) / logosPlugin

# 関数: logosPlugin()

> **logosPlugin**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

Create the logos plugin.

The `css` hook contributes the `--instui-logo-*` image tokens (as `url(data:…)` values), so a
stylesheet built with the plugin can reference any logo through `var()`.

## パラメーター

### options?

[`LogosOptions`](../interfaces/LogosOptions.md) = `{}`

[LogosOptions](../interfaces/LogosOptions.md).

## 戻り値

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

A [PantokenPlugin](../../../../../packages/core/src/interfaces/PantokenPlugin.md) with a `css` hook.

## 例

**Add the logo image tokens when assembling CSS through toCss**

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import { logosPlugin } from "@pantoken/plugin-logos";

const css = toCss(byTheme("rebrand"), { plugins: [logosPlugin()] });
// then in CSS: background-image: var(--instui-logo-instructure-horizontal-full-color);
```
