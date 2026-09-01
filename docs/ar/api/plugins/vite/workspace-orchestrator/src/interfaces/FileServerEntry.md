[pantoken](../../../../../index.md) / [plugins/vite/workspace-orchestrator/src](../index.md) / FileServerEntry

# واجهة: FileServerEntry

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

إدخال واحد لوسيط برمجيات (middleware) لخدمة الملفات الثابتة.

## الخصائص

### mountPath

> **mountPath**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

بادئة مسار URL لتركيب الوسيط عندها، على سبيل المثال `"/styles/apps"`.

***

### serveDir

> **serveDir**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

الدليل المحلي الذي تُقدَّم منه الملفات.

***

### extension

> **extension**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

خدمة الملفات فقط التي ينتهي مسار URL الخاص بها بهذا الامتداد، على سبيل المثال `".css"`.

***

### contentType

> **contentType**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

القيمة لرأس الاستجابة `Content-Type`.

***

### pathTransform?

> `optional` **pathTransform?**: (`urlRelativePath`) => `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

تحويل اختياري يُطبَّق على المسار النسبي للـ URL قبل حله مقابل `serveDir`, على سبيل المثال
`(p) => p.replace(//([^/]+)\.css$/, "/$1/app.css")`.

#### المعلمات

##### urlRelativePath

`string`

#### القيم المرجعة

`string`
