[pantoken](../../../../../index.md) / [plugins/pantoken/logos/src](../index.md) / logosPlugin

# Function: logosPlugin()

> **logosPlugin**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

إنشاء مكون الشعارات الإضافي.

يساهم الـ `css` hook برموز الصور `--instui-logo-*` (كقيم `url(data:…)`)، بحيث يمكن لجدول الأنماط المبني بالمكون الإضافي الرجوع إلى أي شعار من خلال `var()`.

## Parameters

### options?

[`LogosOptions`](../interfaces/LogosOptions.md) = `{}`

[LogosOptions](../interfaces/LogosOptions.md).

## Returns

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

إضافة [PantokenPlugin](../../../../../packages/core/src/interfaces/PantokenPlugin.md) بخطاف `css`.

## Example

**أضف رموز صور الشعار عند تجميع CSS من خلال toCss**

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import { logosPlugin } from "@pantoken/plugin-logos";

const css = toCss(byTheme("rebrand"), { plugins: [logosPlugin()] });
// then in CSS: background-image: var(--instui-logo-instructure-horizontal-full-color);
```
