[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / buildRegisterContext

# Function: buildRegisterContext()

> **buildRegisterContext**(`options`, `target`, `resolveIconSvg`): [`RegisterContext`](../interfaces/RegisterContext.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

بناء [RegisterContext](../interfaces/RegisterContext.md) المشترك خيط استدعاء على غرار `register()` إلى كل `define` عنصر.
محلل الأيقونة قابل للحقن: `register()` يمرر دائماً الحقيقي،
[iconSvg](iconSvg.md) المدعوم بـ `@pantoken/icons` (السلوك الافتراضي دون تغيير لكل متصل موجود)،
بينما يمرر بناء CDN لكل عنصر [noopIconSvg](noopIconSvg.md) للعناصر التي لا تستدعيه أبداً —
`@pantoken/icons`/`@pantoken/tokens` هو اعتماد بحجم عدة ميجابايت، وبما أن Rollup لا يستطيع تقسيم الرمز
إخراج `iife`/`umd`، يصل أي شيء قابل للوصول إليه من نقطة دخول الحزمة إلى كل
الحزمة، بغض النظر عما إذا كان مسار رمز العنصر المحدد يستدعيه أبداً. هذه الوحدة ليس لديها
آثار جانبية على المستوى الأعلى لهذا السبب بالضبط — استيرادها (بخلاف استيراد `../index.ts`، الذي
يسجل كل شيء تلقائياً عند الاستيراد) لا تصل أبداً إلى [iconSvg](iconSvg.md) إلا إذا مرر المتصل فيه.

## Parameters

### options

[`RegisterContextOptions`](../interfaces/RegisterContextOptions.md)

نفس الشكل كخيارات `register()`، ناقصاً `only`.

### target

[`ElementRegistry`](../interfaces/ElementRegistry.md)

السجل المراد التعريف فيه.

### resolveIconSvg

(`name`) => `string`

المحلل المدمج في `ctx.iconSvg` — مرر [iconSvg](iconSvg.md) للأيقونات الحقيقية
أو [noopIconSvg](noopIconSvg.md) عندما تثبت مجموعة عناصر المتصل أنها لا تعيد تصيير أي منها (انظر
`ICON_ELEMENTS` في `./elements-meta.ts`).

## Returns

[`RegisterContext`](../interfaces/RegisterContext.md)
