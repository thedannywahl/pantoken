[pantoken](../../../../../index.md) / [plugins/pantoken/deprecations/src](../index.md) / dueForRemoval

# Ֆունկցիա: dueForRemoval()

> **dueForRemoval**(`ledger`, `current`): `DeprecationEntry`[]

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Գրառումները, որոնց `removeIn` վերնային մինոր տարբերակը հասել է ընթացիկ կառուցման կողմից — այսինքն shim-ներ, որոնք հիմա պետք է հեռացվեն։ Վերնակայուրգ խրհուրդը չի ստանդարտացված, մինչ որևէ առկա են։

## Պարամետրեր

### ledger

`DeprecationLedger`

Մյուսման գրառամատյանը։

### current

[`UpstreamVersions`](../interfaces/UpstreamVersions.md)

Ներկայումս լուծված վերնային տարբերակները։

## Վերադարձվող արժեք

`DeprecationEntry`[]

Հեռացման համար նշանակված գրառումները։
