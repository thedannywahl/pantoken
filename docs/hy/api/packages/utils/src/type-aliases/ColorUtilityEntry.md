[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / ColorUtilityEntry

# Տիպի հոմանիշ: ColorUtilityEntry

> **ColorUtilityEntry** = `string` \| readonly \[`string`, `string`\]

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Մեկ իմաստային գույնի ընտանիքի գրառում. մերկ անուն (լուծված `--instui-color-&lt;family&gt;-&lt;name&gt;`-ի դեմ)
 կամ հստակ `[name, value]` զույգ — երկրորդ տարրը `var()`-ապակված է, եթե դա `--custom-prop`
 անուն է, կամ հակառակ դեպքում օգտագործվում է բառացիորեն (`light-dark(…)` արտահայտություն, հում բառեր `transparent`):
