[pantoken](../../../../index.md) / [tools/aggregate/src](../index.md) / discoverTargets

# Function: discoverTargets()

> **discoverTargets**(`metaDir`): [`Target`](../interfaces/Target.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

اقرأ أهداف `pantoken` من تبعيات حزمة meta.

## Parameters

### metaDir

`string`

## Returns

[`Target`](../interfaces/Target.md)[]

## Example

**فحص ما سيتم دمجه، بدون كتابة أي شيء**

```ts
import { discoverTargets } from "@pantoken/aggregate";

const targets = discoverTargets("/path/to/packages/pantoken");
for (const t of targets) console.log(t.key, t.kind, "->", t.pkg);
```
