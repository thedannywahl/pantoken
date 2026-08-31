[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / ColorUtilityEntry

# Type Alias: ColorUtilityEntry

> **ColorUtilityEntry** = `string` \| readonly \[`string`, `string`\]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

En semantisk farvefamilieindgang: et blot navn (løst mod `--instui-color-&lt;family&gt;-&lt;name&gt;`)
eller et eksplicit `[name, value]` par — det andet element er `var()`-pakket hvis det er et `--custom-prop`
navn, eller brugt ordret ellers (et `light-dark(…)` udtryk, et råt nøgleord som `transparent`).
