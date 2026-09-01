[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / ColorUtilityEntry

# اسم نوع مستعار: ColorUtilityEntry

> **ColorUtilityEntry** = `string` \| readonly \[`string`, `string`\]

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

إدخال واحد لعائلة ألوان معنوية: اسم عاري (يُحل مقابل `--instui-color-&lt;family&gt;-&lt;name&gt;`)
 أو زوج صريح `[name, value]` — العنصر الثاني ملفوف بـ `var()` إذا كان اسمًا `--custom-prop`
، أو يُستخدم حرفيًا خلاف ذلك (تعبير `light-dark(…)`، كلمة مفتاحية خام مثل `transparent`).
