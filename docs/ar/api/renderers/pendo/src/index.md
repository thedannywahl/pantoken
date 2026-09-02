[pantoken](../../../index.md) / pendo

# pendo

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

`@pantoken/pendo` — ورقة أنماط عالمية بنمط Instructure لأدلة Pendo.

Pendo injects guide HTML into a host page; this renders that guide DOM (`._pendo-*`) to match
Instructure UI, using pantoken's `--instui-*` token layer for alignment. It includes responsive
violet and sea banner guide treatments alongside alerts, popovers, surveys, and controls. The
component CSS is ported from `@instructure/pendo-global-css`; pantoken supplies the tokens and the
assembly. A single theme class containing `instui` activates the scoped stylesheet; compact
suffixes on that class select banner colors and glyphs.

[buildPendoCss](functions/buildPendoCss.md) يؤلف ورقة الأنماط؛ [pendoCss](variables/pendoCss.md) هو بناء `rebrand` الجاهز
(مقيد، `!important`). يتم نشر ملف ثابت في `@pantoken/pendo/global.css`.

```demo
self:pendo
```

## مثال

```ts
import { pendoCss } from "@pantoken/pendo";
// or a variant: buildPendoCss({ theme: "canvas", scope: false })
```

## واجهات

- [BuildPendoCssOptions](interfaces/BuildPendoCssOptions.md)
- [AddScopeOptions](interfaces/AddScopeOptions.md)

## المتغيرات

- [pendoCss](variables/pendoCss.md)
- [LAYER\_ORDER](variables/LAYER_ORDER.md)
- [COMPONENTS](variables/COMPONENTS.md)
- [addImportant](variables/addImportant.md)
- [addScope](variables/addScope.md)

## الدوال

- [buildPendoCss](functions/buildPendoCss.md)

## المراجع

### default

يعيد تسمية ويُعيد تصدير [pendoCss](variables/pendoCss.md)
