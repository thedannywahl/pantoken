[pantoken](../../../index.md) / aggregate

# aggregate

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Բարձրացված `pantoken` մետա փաթեթի համախմբիչ: Այն սկանավորում է մետա փաթեթի կախվածությունները
`pantoken` դաշտի համար, այնուհետև ստեղծում է բարելը (`export * as &lt;key&gt; from "&lt;pkg&gt;"`), մեկ
ստորուղի մուտքի ֆայլ յուրաքանչյուր թիրախի համար, և մետա `package.json` `exports` քարտեզ — այնպես որ նոր թիրախ
փաթեթ `pantoken` դաշտով ավտոմատ կերպով գրանցվում է, առանց ձեռքով բարել խմբագրման:

## Interfaces

- [Target](interfaces/Target.md)
- [AggregateOptions](interfaces/AggregateOptions.md)

## Functions

- [discoverTargets](functions/discoverTargets.md)
- [aggregate](functions/aggregate.md)
