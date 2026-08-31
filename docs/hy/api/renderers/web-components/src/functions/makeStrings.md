[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / makeStrings

# Function: makeStrings()

> **makeStrings**(`locale`, `overrides?`): [`WebComponentStrings`](../interfaces/WebComponentStrings.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Կառուցել `WebComponentStrings` օբյեկտ `locale`-ի համար:
Աշխատանքային օրերի անունները ստացվում են `Intl.DateTimeFormat`-ից (և պտտվածք տեղայնացման շաբաթի առաջին օրին);
բոլոր այլ տողերը վերականգնում են անգլերեն, եթե `overrides`-ում տրված չեն:

## Parameters

### locale

`string`

### overrides?

`Partial`\<[`WebComponentStrings`](../interfaces/WebComponentStrings.md)\>

## Returns

[`WebComponentStrings`](../interfaces/WebComponentStrings.md)
