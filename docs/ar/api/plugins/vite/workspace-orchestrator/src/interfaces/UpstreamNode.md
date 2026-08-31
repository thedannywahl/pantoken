[pantoken](../../../../../index.md) / [plugins/vite/workspace-orchestrator/src](../index.md) / UpstreamNode

# Interface: UpstreamNode

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

حزمة مساحة عمل واحدة من الأعلى يتم مراقبتها وإعادة بناؤها.

## Properties

### name

> **name**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

اسم العرض لرسائل السجل.

---

### dir

> **dir**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

دليل جذر الحزمة (الدليل الحالي لأمر البناء).

---

### watchPaths

> **watchPaths**: `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

المسارات (الملفات أو الأدلة) المراد مراقبتها — يتم مراقبة الأدلة بشكل متكرر.

---

### build

> **build**: readonly \[`string`, `string`\]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

أمر البناء: العنصر الأول قابل للتنفيذ، والباقي حجج.

---

### dependents

> **dependents**: readonly `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

أسماء عقد أخرى من الأعلى لإعادة بناؤها بعد نجاح هذا.

---

### include?

> `optional` **include?**: readonly `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

أنماط Glob للملفات المراد تضمينها. عند التعيين، تؤدي التغييرات على الملفات المطابقة لنمط واحد على الأقل إلى تشغيل إعادة البناء. تجاهل لتضمين كل شيء.

---

### ignore?

> `optional` **ignore?**: readonly `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

أنماط Glob للملفات المراد تجاهلها. يتم تخطي التغييرات على الملفات المطابقة بصمت. تجاهل لعدم تجاهل شيء.
