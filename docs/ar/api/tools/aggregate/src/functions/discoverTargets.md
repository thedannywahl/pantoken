[pantoken](../../../../index.md) / [tools/aggregate/src](../index.md) / discoverTargets

# دالة: discoverTargets()

> **discoverTargets**(`metaDir`): [`Target`](../interfaces/Target.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

اقرأ أهداف `pantoken` من تبعيات حزمة meta.

## المعلمات

### metaDir

`string`

## القيم المرجعة

[`Target`](../interfaces/Target.md)[]

## مثال

**افحص ما سيُجمَع، دون كتابة أي شيء**

```ts
import { discoverTargets } from "@pantoken/aggregate";

const targets = discoverTargets("/path/to/packages/pantoken");
for (const t of targets) console.log(t.key, t.kind, "->", t.pkg);
```
