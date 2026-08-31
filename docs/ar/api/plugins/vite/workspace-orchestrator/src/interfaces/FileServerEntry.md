[pantoken](../../../../../index.md) / [plugins/vite/workspace-orchestrator/src](../index.md) / FileServerEntry

# Interface: FileServerEntry

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

إدخال واحد للبرنامج الوسيط الذي يخدم الملفات الثابتة.

## Properties

### mountPath

> **mountPath**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

بادئة مسار URL لتثبيت البرنامج الوسيط عليها، على سبيل المثال `"/styles/apps"`.

---

### serveDir

> **serveDir**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

الدليل المحلي لخدمة الملفات منه.

---

### extension

> **extension**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

خدّم فقط الملفات التي ينتهي مسار URL الخاص بها بهذا الامتداد، على سبيل المثال `".css"`.

---

### contentType

> **contentType**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

القيمة لرأس الاستجابة `Content-Type`.

---

### pathTransform?

> `optional` **pathTransform?**: (`urlRelativePath`) => `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

تحويل اختياري يتم تطبيقه على المسار النسبي لـ URL قبل الحل مقابل `serveDir`، على سبيل المثال `(p) => p.replace(//([^/]+)\.css$/, "/$1/app.css")`.

#### Parameters

##### urlRelativePath

`string`

#### Returns

`string`
