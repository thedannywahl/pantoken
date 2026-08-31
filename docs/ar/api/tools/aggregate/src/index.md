[pantoken](../../../index.md) / aggregate

# aggregate

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

المجمع لحزمة `pantoken` الموحدة. يقوم بمسح تبعيات حزمة البيانات الوصفية
للبحث عن حقل `pantoken`، ثم يقوم بإنشاء البرميل (`export * as &lt;key&gt; from "&lt;pkg&gt;"`)، ملف إدخال مسار فرعي واحد لكل هدف، وخريطة `package.json` `exports` الوصفية — بحيث تؤدي إضافة حزمة هدف جديدة بحقل `pantoken` إلى تسجيلها تلقائياً، بدون تعديلات برميل يدوية.

## Interfaces

- [Target](interfaces/Target.md)
- [AggregateOptions](interfaces/AggregateOptions.md)

## Functions

- [discoverTargets](functions/discoverTargets.md)
- [aggregate](functions/aggregate.md)
