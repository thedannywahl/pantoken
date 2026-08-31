[pantoken](../../../../index.md) / workspace-orchestrator

# workspace-orchestrator

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/vite-workspace-orchestrator` — إضافة خادم تطوير Vite التي تراقب حزم مساحة العمل الأعلى وتعيد بناءها (وتوابعها) عند تغيير المصدر.

أثناء التطوير، عادة ما تحتاج التغييرات على حزمة مساحة العمل المحلية إلى إعادة بناء يدوية قبل أن يعكسها خادم التطوير. تؤتمت هذه الإضافة ذلك: فهي تراقب مصدر كل حزمة أعلى باستخدام `fs.watch` الأصلي (وليس chokidar الخاص بـ Vite، الذي يصفي المسارات خارج جذر المشروع)، وتخفف التغييرات السريعة، وتعيد البناء بترتيب طوبولوجي، وتسجل المخرجات المدمجة مع مراقب Vite حتى يعيد تحميل المتصفح. في مستندات pantoken، تحافظ على CSS المُنشأ (`@pantoken/css`، `@pantoken/components`) طازجاً عند تحرير المكتبات، بدلاً من فقط وقت البناء.

يتم تطبيقه خلال `serve` فقط، لذلك لا تتأثر عمليات البناء الإنتاجية.

## Example

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

## Interfaces

- [UpstreamNode](interfaces/UpstreamNode.md)
- [FileServerEntry](interfaces/FileServerEntry.md)
- [OrchestratorOptions](interfaces/OrchestratorOptions.md)

## Functions

- [matchesFilters](functions/matchesFilters.md)
- [workspaceOrchestrator](functions/workspaceOrchestrator.md)
