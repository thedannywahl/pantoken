[pantoken](../../../../../index.md) / [plugins/vite/workspace-orchestrator/src](../index.md) / UpstreamNode

# واجهة: UpstreamNode

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

حزمة عمل upstream واحدة للمراقبة وإعادة البناء.

## الخصائص

### name

> **name**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

اسم العرض لرسائل السجل.

***

### dir

> **dir**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

دليل جذر الحزمة (دليل العمل للأمر build).

***

### watchPaths

> **watchPaths**: `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

المسارات (ملفات أو مجلدات) للمراقبة — تُراقب المجلدات بشكل متكرر داخلها (recursively).

***

### build

> **build**: readonly \[`string`, `string`\]

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

أمر البناء: العنصر الأول هو القابل للتنفيذ، والباقي هي الوسائط.

***

### dependents

> **dependents**: readonly `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

أسماء العقد upstream الأخرى التي تُعاد بناؤها بعد نجاح هذه العقدة.

***

### include?

> `optional` **include?**: readonly `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

أنماط glob للملفات التي تُدرج. عند التعيين، يؤدي التغيير فقط في الملفات التي تطابق
نمطًا واحدًا على الأقل إلى تحفيز إعادة البناء. اتركها لتضمين كل شيء.

***

### ignore?

> `optional` **ignore?**: readonly `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

أنماط glob للملفات التي تُتجاهل. تُتخطى التغييرات في الملفات المطابقة بصمت. اتركها لعدم
تجاهل أي شيء.
