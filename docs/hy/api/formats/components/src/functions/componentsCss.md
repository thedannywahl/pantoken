[pantoken](../../../../index.md) / [formats/components/src](../index.md) / componentsCss

# Function: componentsCss()

> **componentsCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Կառուցեք համակցված բաղադրիչային ոճ-հաղորդակցման թերթ՝ յուրաքանչյուր բաղադրիչի կանոնները `COMPONENTS` շարակցման հերթականությամբ։ Հաշվի միջոցի և կեղծանունի երկվորյակները ավելացվում են ՀԱ ԲԱՂԱԴՐԻՉ (նրա սեփական հատվածում), ուստի յուրաքանչյուր կեղծանուն փաստաթղթավորվում է իր սեփական էջում — կեղծանունները հայտնաբերվում են յուրաքանչյուր ռեկորդի `@alias {@link -x}` կամ `@deprecated {@link -x}` մետատվյալներից (տես `withAliases`), ոչ թե կենտրոնական ձեռքով պահպանված ցուցակ։ Այն `--instui-elevation-*` ստվերային սանդղակը, որը բաղադրիչները հղում են, սահմանված է տոկեն թերթում (`@pantoken/css`), ուստի այն այլեւ ներծծված չէ այստեղ։

## Parameters

### options?

[`ComponentOptions`](../interfaces/ComponentOptions.md) = `{}`

[ComponentOptions](../interfaces/ComponentOptions.md).

## Returns

`string`

CSS տողը։
