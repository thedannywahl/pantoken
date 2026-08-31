[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / ICON\_ELEMENTS

# Variable: ICON\_ELEMENTS

> `const` **ICON\_ELEMENTS**: readonly \[`"icon"`, `"calendar"`, `"date-input"`, `"drilldown"`, `"rating"`\]

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Բազային տարրերի անունները, որոնք իրականում կանչում են [iconSvg](../functions/iconSvg.md) տեղային խորհրդանիշ ցուցադրելու համար, ի տարբերություն առանձին CSS-միայն `-icon-&lt;name&gt;` խորհրդանիշ գծաքանակի, որը շատ բաղադրիչներ օգտագործում են (CSS հատուկ հատկության վրա դիմակ, ոչ JS լուծում): `date-time-input` ցուցակված չէ, քանի որ այն չի կանչում `iconSvg` ինքն — այն հյուսում է `date-input`/`calendar` ([տես NESTED\_DEPS](NESTED_DEPS.md)), որոնք անում են:
