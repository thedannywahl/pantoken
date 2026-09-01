[pantoken](../../../../../index.md) / [plugins/pantoken/logos/src](../index.md) / logosPlugin

# دالة: logosPlugin()

> **logosPlugin**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

إنشاء ملحق الشعارات.

الخطاف `css` يضيف توكنات الصور `--instui-logo-*` (كقيم `url(data:…)`)، لذا يمكن لورقة الأنماط التي تُنشأ باستخدام الملحق الإشارة إلى أي شعار عبر `var()`.


## المعلمات

### options?

[`LogosOptions`](../interfaces/LogosOptions.md) = `{}`

[LogosOptions](../interfaces/LogosOptions.md).

## القيم المرجعة

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

ملحق [PantokenPlugin](../../../../../packages/core/src/interfaces/PantokenPlugin.md) يحتوي على الخطاف `css`.

## مثال

**أضف توكنات صور الشعار عند تجميع CSS عبر toCss**

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import { logosPlugin } from "@pantoken/plugin-logos";

const css = toCss(byTheme("rebrand"), { plugins: [logosPlugin()] });
// then in CSS: background-image: var(--instui-logo-instructure-horizontal-full-color);
```
