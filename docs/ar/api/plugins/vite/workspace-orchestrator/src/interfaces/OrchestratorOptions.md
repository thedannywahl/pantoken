[pantoken](../../../../../index.md) / [plugins/vite/workspace-orchestrator/src](../index.md) / OrchestratorOptions

# واجهة: OrchestratorOptions

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

خيارات الخاص بـ [workspaceOrchestrator](../functions/workspaceOrchestrator.md).

## الخصائص

### upstream

> **upstream**: readonly [`UpstreamNode`](UpstreamNode.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

رسم اعتماد مساحة العمل الصاعد.

***

### outputWatchPaths?

> `optional` **outputWatchPaths?**: readonly `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

مسارات للمراقبة باستخدام `fs.watch` الأصلية حتى تلتقط Vite المخرجات المبنية بعد إعادة البناء الصاعد
(مثلاً دليل `dist` أو `generated` لحزمة). تستخدم `fs.watch` الأصلية بدلاً من
`add()` الخاص بـ chokidar، الذي لا يكتشف التغييرات بشكل موثوق في الدلائل المرتبطة عبر pnpm أو خارج الجذر. عند كل تغيير يُصدَر حدث `"change"` اصطناعي على `server.watcher`: بالنسبة لملفات CSS الموجودة بالفعل في مخطط الوحدات يقوم Vite بتشغيل تحديث ساخن مستهدف؛ أما لأي شيء آخر فيعود إلى إعادة تحميل الصفحة كاملة.

***

### debounceMs?

> `optional` **debounceMs?**: `number`

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

زمن التخميد بالميلي ثانية قبل تشغيل إعادة البناء (الافتراضي: 200).

***

### fileServers?

> `optional` **fileServers?**: readonly [`FileServerEntry`](FileServerEntry.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

إدخالات وسيط خدمة الملفات الثابتة الاختيارية.
