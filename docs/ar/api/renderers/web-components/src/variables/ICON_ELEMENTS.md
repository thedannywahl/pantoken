[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / ICON\_ELEMENTS

# متغير: ICON\_ELEMENTS

> `const` **ICON\_ELEMENTS**: readonly \[`"icon"`, `"calendar"`, `"date-input"`, `"drilldown"`, `"rating"`\]

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

أسماء العناصر الأساسية التي تستدعي بالفعل [iconSvg](../functions/iconSvg.md) لرسم رمز مضمن، على عكس
الطريقَة المنفصلة المعتمدة على CSS فقط `-icon-&lt;name&gt;` التي تستخدمها معظم المكونات (قناع على خاصية مخصصة في CSS، ولا تتطلب حلًّا عبر JS). `date-time-input` غير مدرجة لأنها لا تستدعي
`iconSvg` بنفسها — بل تتضمن داخليًا `date-input`/`calendar` (انظر [NESTED\_DEPS](NESTED_DEPS.md))، والتي تفعل ذلك.
