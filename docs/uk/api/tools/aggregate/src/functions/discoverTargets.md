[pantoken](../../../../index.md) / [tools/aggregate/src](../index.md) / discoverTargets

# Функція: discoverTargets()

> **discoverTargets**(`metaDir`): [`Target`](../interfaces/Target.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Read the `pantoken` targets from the meta package's dependencies.

## Параметри

### metaDir

`string`

## Повертає

[`Target`](../interfaces/Target.md)[]

## Приклад

**Inspect what would be aggregated, without writing anything**

```ts
import { discoverTargets } from "@pantoken/aggregate";

const targets = discoverTargets("/path/to/packages/pantoken");
for (const t of targets) console.log(t.key, t.kind, "->", t.pkg);
```
