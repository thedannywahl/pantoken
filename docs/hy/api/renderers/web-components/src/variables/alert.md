[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / alert

# Variable: alert

> `const` **alert**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-alert&gt;` — տեղային կարգավիճակի հաղորդագրություն `role="alert"` հետ: `variant` հատկությունը քարտեզ է անում `-color-&lt;variant&gt;` փոփոխիչին (`info`, `success`, `warning`, `danger`): Ահազանգերն առանձնացված են լռելյալ; սահմանեք `has-shadow="false"` հարթեցնելու համար (→ `-without-shadow`, արտացոլելով InstUI-ի `hasShadow={false}`): `timeout` հատկությունը (միլիվայրկյան) ինքնաբերձ ջնջում է ահազանգը այդ հետաձգումից հետո — այն սահում է, ինքն իրեն հեռացնում DOM-ից և շարժական պղպջակ `dismiss` իրադարձություն է վառում (կանչել `preventDefault()` դրա վրա ահազանգը հաստատել): Սահելու վիճակները օգտագործում են `@pantoken/components`-ի `transition` օգտային; բեռնեք դրա ոճական թերթ ժամանակի վերջում ջնջման դեպքում: Տեղադրված բովանդակությունը հաղորդագրության մարմինն է:

## Example

```html
<instui-alert variant="success" margin="0 0 small">Your changes were saved.</instui-alert>
<instui-alert variant="info" has-shadow="false">A flat, inline notice.</instui-alert>
<!-- auto-dismisses after 5s, firing a cancelable `dismiss` event: -->
<!-- <instui-alert variant="warning" timeout="5000">Saving…</instui-alert> -->
```
