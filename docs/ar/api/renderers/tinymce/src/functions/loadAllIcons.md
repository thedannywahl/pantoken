[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / loadAllIcons

# دالة: loadAllIcons()

> **loadAllIcons**(): `Promise`\<[`TaggedIcon`](../interfaces/TaggedIcon.md)[]\>

تحميل ودمج جميع الأيقونات المتاحة من كلا المصدرين.
يعيد مصفوفة مرتبة موسومة بحزمة المصدر.

ملاحظة: أسماء أيقونات المكون مشتقة من المعدل `-icon-*` الخاص بالنموذج.
يجب تعبئتها إما من `docs/public/icon-manifest.json` (إذا كانت قابلة للاستهلاك)
أو من ملف مانيفست منشور جنبًا إلى جنب مع formats/components model.json.
في الوقت الحالي، يتم تضمين simple-icons فقط.

## القيم المرجعة

`Promise`\<[`TaggedIcon`](../interfaces/TaggedIcon.md)[]\>
