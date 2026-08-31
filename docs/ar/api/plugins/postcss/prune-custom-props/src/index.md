[pantoken](../../../../index.md) / prune-custom-props

# prune-custom-props

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-prune-custom-props` — إزالة الخصائص المخصصة غير المستخدمة من ورقة أنماط مكونة.

مصدر pantoken `@pantoken/css` يصدر مجموعة رموز `--instui-*` الكاملة (≈1,800 رمز data-URIs مضمّنة). محرك رسومات يبني على تلك الطبقة لكن يعطي أسلوبًا فقط لجزء من النظام سيشحن خلاف ذلك المجموعة الكاملة — لذا أي محرك رسومات كهذا يريد هذا. بدءًا من مراجع `var()` في الإعلانات الفعلية (غير الخصائص المخصصة)، فإنه يحتفظ فقط بالخصائص المخصصة القابلة للوصول بالفعل بشكل متعدٍ، ويسقط سجلات `@property` غير المستخدمة المطابقة.

إنه مكون إضافي PostCSS مستقل (قم بتشغيله في خط أنابيب PostCSS الخاص بك). تعيد المصنع كائن مكون إضافي عادي، لذا فإن استيراد هذه الوحدة لا يسحب أي تبعية في الوقت الفعلي — `postcss` هو مجرد نوع.

## Example

```ts
import postcss from "postcss";
import { pruneCustomProps } from "@pantoken/plugin-prune-custom-props";
const out = postcss([pruneCustomProps()]).process(css, { from: undefined }).css;
```

## Variables

- [pruneCustomProps](variables/pruneCustomProps.md)

## References

### default

يعيد تسمية وإعادة تصدير [pruneCustomProps](variables/pruneCustomProps.md)
