[pantoken](../../../index.md) / aggregate

# aggregate

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

مجمّع لحزمة الميتا الموحدة `pantoken`. يقوم بمسح تبعيات حزمة الميتا
للبحث عن الحقل `pantoken`، ثم يُولّد الـ barrel (`export * as &lt;key&gt; from "&lt;pkg&gt;"`)، ملف إدخال مسار فرعي واحد لكل هدف، وخرائط الميتا `package.json` `exports` — لذا فإن إضافة حزمة هدف جديدة تحتوي على الحقل `pantoken` تقوم بتسجيلها تلقائيًا، دون الحاجة لتعديلات يدوية على الـ barrel.

## واجهات

- [Target](interfaces/Target.md)
- [AggregateOptions](interfaces/AggregateOptions.md)

## الدوال

- [discoverTargets](functions/discoverTargets.md)
- [aggregate](functions/aggregate.md)
