[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / ColorUtilityEntry

# Àlies de tipus: ColorUtilityEntry

> **ColorUtilityEntry** = `string` \| readonly \[`string`, `string`\]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Una entrada de família de color semàntica: un nom senzill (resolt contra `--instui-color-&lt;family&gt;-&lt;name&gt;`) o un parell `[name, value]` explícit — el segon element està envoltant-lo amb `var()` si és un nom `--custom-prop`, o s'utilitza literalment en cas contrari (una expressió `light-dark(…)`, una paraula clau crua com `transparent`).
