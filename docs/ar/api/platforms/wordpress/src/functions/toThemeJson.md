[pantoken](../../../../index.md) / [platforms/wordpress/src](../index.md) / toThemeJson

# دالة: toThemeJson()

> **toThemeJson**(`tokens`, `options?`): [`ThemeJson`](../interfaces/ThemeJson.md)

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

حوّل قائمة رموز IR إلى WordPress `theme.json`.

## المعلمات

### tokens

للقراءة فقط [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

الـ IR (مثلًا من `@pantoken/tokens`).

### options?

[`ToThemeJsonOptions`](../interfaces/ToThemeJsonOptions.md) = `{}`

[ToThemeJsonOptions](../interfaces/ToThemeJsonOptions.md).

## القيم المرجعة

[`ThemeJson`](../interfaces/ThemeJson.md)

مستند `theme.json`.

## أمثلة

**حوّل الـ IR إلى theme.json بنمط فاتح**

```ts
import { toThemeJson } from "@pantoken/wordpress";
import { byTheme } from "@pantoken/tokens";

const doc = toThemeJson(byTheme("rebrand"));
doc.settings.color.palette; // [{ slug, name, color }, …]
```

**الوضع الداكن**

```ts
import { toThemeJson } from "@pantoken/wordpress";
import { byTheme } from "@pantoken/tokens";

const doc = toThemeJson(byTheme("canvas"), { mode: "dark" });
```
