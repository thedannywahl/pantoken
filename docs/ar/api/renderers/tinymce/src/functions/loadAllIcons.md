[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / loadAllIcons

# Function: loadAllIcons()

> **loadAllIcons**(): `Promise`\<[`TaggedIcon`](../interfaces/TaggedIcon.md)[]\>

حمّل ودمج جميع الرموز المتاحة من كلا المصدرين.
يرجع مصفوفة مرتبة موسومة بحزمة المصدر.

ملاحظة: يتم اشتقاق أسماء رموز المكون من معدل `-icon-*` الخاص بالنموذج.
يجب أن يتم ملؤها من إما `docs/public/icon-manifest.json` (إن كانت قابلة للاستهلاك)
أو ملف بيان منشور إلى جانب formats/components model.json.
في الوقت الحالي، تم تضمين رموز بسيطة فقط.

## Returns

`Promise`\<[`TaggedIcon`](../interfaces/TaggedIcon.md)[]\>
