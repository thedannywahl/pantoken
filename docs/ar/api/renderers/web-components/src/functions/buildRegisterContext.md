[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / buildRegisterContext

# دالة: buildRegisterContext()

> **buildRegisterContext**(`options`, `target`, `resolveIconSvg`): [`RegisterContext`](../interfaces/RegisterContext.md)

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

ابنِ [RegisterContext](../interfaces/RegisterContext.md) المشترك كنداء من نوع `register()` يمرّ عبر `define` لكل عنصر.
محدد الأيقونات قابل للحقن: `register()` يمرّر دائمًا الـ
الحقيقي المدعوم بـ `@pantoken/icons` [iconSvg](iconSvg.md) (السلوك الافتراضي غير المتغير لجميع المستدعين الحاليين)،
بينما بناء CDN لكل عنصر يمرّر [noopIconSvg](noopIconSvg.md) للعناصر التي لا تستدعيه أبدًا —
`@pantoken/icons`/`@pantoken/tokens` تبعيات بحجم عدة ميغابايت، ونظرًا لأن Rollup لا يستطيع فصل الشيفرة
إلى مخرجات `iife`/`umd`، فأي شيء يمكن الوصول إليه ثابتًا من مدخل الحزمة ينتهي داخل الحزمة بأكملها، بغض النظر عمّا إذا كان مسار الشيفرة لذلك العنصر يَدعوها أم لا. لهذا السبب تحديدًا لا يحتوي هذا الوحدة على تأثيرات جانبية على مستوى القمة — استيرادها (على عكس استيراد `../index.ts`، الذي يقوم بالتسجيل التلقائي عند الاستيراد) لا يصل إلى [iconSvg](iconSvg.md) ما لم يمرّره المستدعي.

## المعلمات

### options

[`RegisterContextOptions`](../interfaces/RegisterContextOptions.md)

نفس بنية خيارات `register()`، مع استثناء `only`.

### target

[`ElementRegistry`](../interfaces/ElementRegistry.md)

السجل الذي سيُعرف بداخله.

### resolveIconSvg

(`name`) => `string`

المحلل المربوط بـ `ctx.iconSvg` — مرّر [iconSvg](iconSvg.md) للأيقونات الحقيقية
  أو [noopIconSvg](noopIconSvg.md) عندما يكون مجموع عناصر المستدعي مثبتًا أنّه لا يعرض أيقونة أبدًا (انظر
  `ICON_ELEMENTS` في `./elements-meta.ts`).

## القيم المرجعة

[`RegisterContext`](../interfaces/RegisterContext.md)
