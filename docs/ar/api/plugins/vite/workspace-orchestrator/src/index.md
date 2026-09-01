[pantoken](../../../../index.md) / workspace-orchestrator

# workspace-orchestrator

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

`@pantoken/vite-workspace-orchestrator` — مكوّن إضافي لخادم التطوير Vite يراقب حزم مساحة العمل العلوية ويعيد بنائها (ومعتمديها) عند تغيّر الشيفرة المصدرية.

أثناء التطوير، عادةً ما تتطلب التغييرات على حزمة مساحة العمل المحلية إعادة بناء يدوية قبل أن يعكسها خادم التطوير.
يقوم هذا المكوّن بأتمتة ذلك: يراقب مصدر كل حزمة علوية باستخدام `fs.watch` الأصلي (وليس chokidar الخاص بـ Vite، الذي يقوم بتصفية المسارات خارج جذر المشروع)،
يُخمّد التغييرات السريعة، يعيد البناء بترتيب طوبولوجي، ويسجل المخرجات المبنية لدى مراقب Vite حتى يعاد تحميل المتصفح.
في توثيق pantoken يحافظ على CSS المولَّد (`@pantoken/css`, `@pantoken/components`) محدثًا أثناء تحرير المكتبات، بدلًا من التحديث فقط عند وقت البناء.

يُطبَّق فقط أثناء `serve`، لذا تظل عمليات البناء للإنتاج دون مساس.

## مثال

```ts
import { resolve } from "node:path";
import { workspaceOrchestrator } from "@pantoken/vite-workspace-orchestrator";

workspaceOrchestrator({
  upstream: [
    {
      name: "@pantoken/components",
      dir: resolve(root, "formats/components"),
      watchPaths: [resolve(root, "formats/components/src")],
      build: ["pnpm", "run", "build"],
      dependents: [],
    },
  ],
  outputWatchPaths: [resolve(root, "formats/components/generated")],
});
```

## واجهات

- [UpstreamNode](interfaces/UpstreamNode.md)
- [FileServerEntry](interfaces/FileServerEntry.md)
- [OrchestratorOptions](interfaces/OrchestratorOptions.md)

## الدوال

- [matchesFilters](functions/matchesFilters.md)
- [workspaceOrchestrator](functions/workspaceOrchestrator.md)
