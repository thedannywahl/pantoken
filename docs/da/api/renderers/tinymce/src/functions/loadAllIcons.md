[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / loadAllIcons

# Function: loadAllIcons()

> **loadAllIcons**(): `Promise`\<[`TaggedIcon`](../interfaces/TaggedIcon.md)[]\>

Indlæs og fusionder alle tilgængelige ikoner fra begge kilder.
Returnerer et sorteret array mærket med kildepakke.

BEMÆRK: Komponent-ikonnavne er afledt fra modelens `-icon-*` ændring.
Dette skal udfyldes fra enten `docs/public/icon-manifest.json` (hvis forbrugbar)
eller et manifest udgivet sammen med formats/components model.json.
Ikke nu er kun simple-ikoner inkluderet.

## Returns

`Promise`\<[`TaggedIcon`](../interfaces/TaggedIcon.md)[]\>
