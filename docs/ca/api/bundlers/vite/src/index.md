[pantoken](../../../index.md) / vite

# vite

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/vite` — un connector de Vite per a pantoken.

Exposa dos mòduls virtuals perquè les aplicacions consumeixin tokens sense importar directament els paquets grans, i pot auto-injectar la full d'estils a l'entrada HTML:

- `virtual:pantoken/css` — la cadena de full d'estils (exportació per defecte).
- `virtual:pantoken/tokens` — l'IR de token resolt (exportació nomenada `tokens` + per defecte).

## Interfícies

- [PantokenViteOptions](interfaces/PantokenViteOptions.md)

## Funcions

- [pantoken](functions/pantoken.md)

## Referències

### default

Canvia de nom i reexporta [pantoken](functions/pantoken.md)
