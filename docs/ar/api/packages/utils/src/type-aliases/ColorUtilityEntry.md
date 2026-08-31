[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / ColorUtilityEntry

# Type Alias: ColorUtilityEntry

> **ColorUtilityEntry** = `string` \| readonly \[`string`, `string`\]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

إدخال عائلة لون دلالية واحدة: اسم بسيط (يتم حله مقابل `--instui-color-&lt;family&gt;-&lt;name&gt;`) أو زوج `[name, value]` صريح — العنصر الثاني مغلف `var()` إذا كان اسم `--custom-prop`، أو يُستخدم حرفيًا بخلاف ذلك (تعبير `light-dark(…)`، كلمة أساسية خام مثل `transparent`).
