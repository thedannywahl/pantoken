[pantoken](../../../index.md) / aggregate

# aggregate

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

The aggregator for the unified `pantoken` meta package. It scans the meta package's dependencies
for the `pantoken` field, then generates the barrel (`export * as &lt;key&gt; from "&lt;pkg&gt;"`), one
subpath entry file per target, and the meta `package.json` `exports` map — so adding a new target
package with a `pantoken` field auto-registers it, with no manual barrel edits.

## 介面

- [Target](interfaces/Target.md)
- [AggregateOptions](interfaces/AggregateOptions.md)

## 函式

- [discoverTargets](functions/discoverTargets.md)
- [aggregate](functions/aggregate.md)
