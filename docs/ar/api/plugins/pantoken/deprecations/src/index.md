[pantoken](../../../../index.md) / deprecations

# deprecations

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

`@pantoken/plugin-deprecations` — أغطية توافق واعية بدورة الحياة للرموز المحذوفة من المصدر الأعلى.

عندما تزيل نسخة من المصدر الأعلى رمزًا `--instui-*`، يقوم ملف `DeprecationLedger` المؤلف يدويًا
بتسجيل دورة حياته: متى تم وسمه كمهمَل، والإصدار الفرعي في المصدر الأعلى الذي سيزيله، وكيفية
إبقائه قيد العمل في الأثناء — إما إعادة التوجيه إلى رمز معياري (`replacement` → `var(...)`) أو
تجميد نصه الأخير المعروف (`value`). يضيف هذا المكوّن الإضافي قناعًا واحدًا لكل مدخل. ونظرًا لأن
القناع عبارة عن `var(...)` مفرد أو قيمة عادية، فإن `defineToken` يسجل `refersTo`/بناء الجملة الخاص به و
`toCss` يصدره، لذلك ينتقل القناع إلى css/scss/less/stylus/wordpress/vanilla دون توصيل إضافي.

يُنفَّذ التقاعد في مكان آخر (خط أنابيب الترقية يفشل بشكل قاسٍ عند ترقية الإصدار الفرعي بمجرد الوصول إلى
الإصدار الفرعي المصدر الأعلى لـ `removeIn` للمدخل، مما يجبر على تقاعد المدخل وقطع إصدار فرعي للمستهلك).
[dueForRemoval](functions/dueForRemoval.md) هو الفحص الذي يديره؛ [describeLifecycle](functions/describeLifecycle.md) هو الذي يدعم المستندات.

## مثال

```ts
import { buildTokens } from "@pantoken/core";
import { deprecationShims } from "@pantoken/plugin-deprecations";
import ledger from "@pantoken/tokens/deprecations.json" with { type: "json" };

buildTokens({ theme: "rebrand", plugins: [deprecationShims(ledger)] });
```

## واجهات

- [UpstreamVersions](interfaces/UpstreamVersions.md)
- [ParsedRef](interfaces/ParsedRef.md)

## الدوال

- [shimValue](functions/shimValue.md)
- [shimEntries](functions/shimEntries.md)
- [ledgerCovers](functions/ledgerCovers.md)
- [parseUpstreamRef](functions/parseUpstreamRef.md)
- [compareVersions](functions/compareVersions.md)
- [dueForRemoval](functions/dueForRemoval.md)
- [describeLifecycle](functions/describeLifecycle.md)
- [deprecationShims](functions/deprecationShims.md)

## المراجع

### default

يعيد تسمية ويعيد تصدير [deprecationShims](functions/deprecationShims.md)
