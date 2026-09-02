[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / loadAllIcons

# Funció: loadAllIcons()

> **loadAllIcons**(): `Promise`\<[`TaggedIcon`](../interfaces/TaggedIcon.md)[]\>

Carrega i fusiona totes les icones disponibles de les dues fonts.
Retorna una matriu ordenada etiquetada amb el paquet de font.

NOTA: Els noms d'icones de components es deriven del modificador `-icon-*` del model.
Això ha de poblar-se de `docs/public/icon-manifest.json` (si és consumible)
o un manifest publicat juntament amb formats/components model.json.
Per ara, només s'inclouen simple-icons.

## Retorna

`Promise`\<[`TaggedIcon`](../interfaces/TaggedIcon.md)[]\>
