[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / ColorUtilityEntry

# Псевдоним типа: ColorUtilityEntry

> **ColorUtilityEntry** = `string` \| readonly \[`string`, `string`\]

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

One semantic colour family entry: a bare name (resolved against `--instui-color-&lt;family&gt;-&lt;name&gt;`)
 or an explicit `[name, value]` pair — the second element is `var()`-wrapped if it's a `--custom-prop`
 name, or used verbatim otherwise (a `light-dark(…)` expression, a raw keyword like `transparent`).
