[pantoken](../../../../index.md) / [tools/aggregate/src](../index.md) / aggregate

# دالة: aggregate()

> **aggregate**(`options`): [`Target`](../interfaces/Target.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

توليد برميل مصدر حزمة meta، مدخلات المسارات الفرعية، وخريطة `exports`.

## المعلمات

### options

[`AggregateOptions`](../interfaces/AggregateOptions.md)

[AggregateOptions](../interfaces/AggregateOptions.md).

## القيم المرجعة

[`Target`](../interfaces/Target.md)[]

الأهداف المكتشفة.

## مثال

**إعادة توليد حزمة meta**

```ts
import { aggregate } from "@pantoken/aggregate";

const targets = aggregate({ metaDir: "/path/to/packages/pantoken" });
// writes src/index.ts (barrel), src/<key>.ts (subpaths), and rewrites package.json exports
console.log(`aggregated ${targets.length} targets`);
```
