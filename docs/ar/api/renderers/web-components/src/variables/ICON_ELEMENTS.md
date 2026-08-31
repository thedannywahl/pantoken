[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / ICON\_ELEMENTS

# Variable: ICON\_ELEMENTS

> `const` **ICON\_ELEMENTS**: readonly \[`"icon"`, `"calendar"`, `"date-input"`, `"drilldown"`, `"rating"`\]

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

أسماء العناصر الأساسية التي تستدعي فعلاً [iconSvg](../functions/iconSvg.md) لتقديم حرف مدمج، على عكس الحرف `-icon-&lt;name&gt;` المنفصل وخاص بـ CSS الذي تستخدمه معظم المكونات (قناع على خاصية CSS مخصصة، بدون دقة JS). لم يتم إدراج `date-time-input` لأنها لا تستدعي `iconSvg` بنفسها — بدلاً من ذلك، تضمن `date-input`/`calendar` (انظر [NESTED\_DEPS](NESTED_DEPS.md))، التي تفعل ذلك.
