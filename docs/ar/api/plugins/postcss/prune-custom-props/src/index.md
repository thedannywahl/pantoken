[pantoken](../../../../index.md) / prune-custom-props

# prune-custom-props

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

`@pantoken/plugin-prune-custom-props` — إزالة الخصائص المخصصة غير المستخدمة (tree-shake) من ورقة أنماط مركبة.


يصدر `@pantoken/css` في pantoken مجموعة الرموز الكاملة `--instui-*` (حوالي 1,800 URI بيانات لأيقونات مضمنة). أي مُولِّد للعرض يبني على تلك الطبقة لكنه يُطبِّق أنماطًا على جزء فقط من النظام قد يضطر لِشحن المجموعة كاملة — لذا أي مُولِّد من هذا النوع يرغب في هذا الوجود. بدءًا من مراجع `var()` في الإعلانات الحقيقية (غير المعتمدة على الخصائص المخصصة)، يحتفظ انتقائيًا بالخصائص المخصصة القابلة للوصول فقط، ويُسقط تسجيلات `@property` غير المستخدمة المطابقة.

إنه ملحق PostCSS مستقل (شغّله في سلسلة PostCSS الخاصة بك). المصنع يعيد كائن ملحق عادي، لذا استيراد هذا الوحدة لا يجلب أي تبعية وقت التشغيل — `postcss` عبارة عن نوع فقط.

## مثال

```ts
import postcss from "postcss";
import { pruneCustomProps } from "@pantoken/plugin-prune-custom-props";
const out = postcss([pruneCustomProps()]).process(css, { from: undefined }).css;
```

## المتغيرات

- [pruneCustomProps](variables/pruneCustomProps.md)

## المراجع

### default

يعيد تسمية ويُعيد تصدير [pruneCustomProps](variables/pruneCustomProps.md)
