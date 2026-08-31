[pantoken](../../../../../index.md) / [plugins/vite/workspace-orchestrator/src](../index.md) / OrchestratorOptions

# Interface: OrchestratorOptions

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

الخيارات لـ [workspaceOrchestrator](../functions/workspaceOrchestrator.md).

## Properties

### upstream

> **upstream**: readonly [`UpstreamNode`](UpstreamNode.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

رسم بياني لتبعيات مساحة العمل الأعلى.

---

### outputWatchPaths?

> `optional` **outputWatchPaths?**: readonly `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

المسارات التي يتم مراقبتها باستخدام `fs.watch` الأصلي بحيث يلتقط Vite المخرجات المدمجة بعد إعادة البناء الأعلى (على سبيل المثال، دليل `dist` أو `generated` للحزمة). يستخدم `fs.watch` الأصلي بدلاً من `add()` الخاص بـ chokidar، والذي لا يكتشف بشكل موثوق التغييرات في الأدلة المرمزة بـ pnpm أو خارج الجذر. عند كل تغيير، يتم إرسال حدث `"change"` الاصطناعي على `server.watcher`: بالنسبة لملفات CSS الموجودة بالفعل في رسم بياني الوحدة، يقوم Vite بتشغيل تحديث ساخن موجه؛ لأي شيء آخر، فإنه يعود إلى إعادة تحميل الصفحة الكاملة.

---

### debounceMs?

> `optional` **debounceMs?**: `number`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

تأخير إزالة الارتداد بالميلي ثانية قبل تشغيل إعادة البناء (الافتراضي: 200).

---

### fileServers?

> `optional` **fileServers?**: readonly [`FileServerEntry`](FileServerEntry.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

إدخالات برنامج وسيط اختيارية لخدمة الملفات الثابتة.
