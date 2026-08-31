[pantoken](../../../../../index.md) / [plugins/pantoken/deprecations/src](../index.md) / dueForRemoval

# Function: dueForRemoval()

> **dueForRemoval**(`ledger`, `current`): `DeprecationEntry`[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Գրառումները, որոնց `removeIn` վերնային մինոր տարբերակը հասել է ընթացիկ կառուցման կողմից — այսինքն shim-ներ, որոնք հիմա պետք է հեռացվեն։ Վերնակայուրգ խրհուրդը չի ստանդարտացված, մինչ որևէ առկա են։

## Parameters

### ledger

`DeprecationLedger`

Մյուսման գրառամատյանը։

### current

[`UpstreamVersions`](../interfaces/UpstreamVersions.md)

Ներկայումս լուծված վերնային տարբերակները։

## Returns

`DeprecationEntry`[]

Հեռացման համար նշանակված գրառումները։
