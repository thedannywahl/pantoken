[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / loadAllIcons

# Function: loadAllIcons()

> **loadAllIcons**(): `Promise`\<[`TaggedIcon`](../interfaces/TaggedIcon.md)[]\>

Բեռնել և միավորել բոլոր հասանելի պատկերները երկու աղբյուրից:
վերադարձնում է տեղավորված զանգված, պիտակավորված աղբյուրի փաթեթով:

ԾԱՆՈԹՈՒԹՅՈՒՆ. Բաղադրիչի պատկերի անունները ստացվել են մոդելի `-icon-*` փոփոխիչից:
Աճ պետք է լրացվել `docs/public/icon-manifest.json`-ից (եթե օգտագործել հնարավոր)
կամ formats/components model.json-ի հետ հրապարակված դրամանից:
Հեռեւ միայն simple-icons-ները ներառված են:

## Returns

`Promise`\<[`TaggedIcon`](../interfaces/TaggedIcon.md)[]\>
