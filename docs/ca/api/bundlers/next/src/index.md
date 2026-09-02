[pantoken](../../../index.md) / next

# next

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/next` — un adaptador de configuració de Next.js.

Instructure UI envia paquets ESM que Next ha de transpilar (`transpilePackages`), el problema #1
quant s'executa InstUI a Next. `withPantoken` fusiona els paquets d'InstUI en aquesta llista. Embolcalla el teu
`next.config`, després importa `@pantoken/css` a la teva disposició arrel pels fitxes.

## Interfícies

- [NextConfigLike](interfaces/NextConfigLike.md)
- [WithPantokenOptions](interfaces/WithPantokenOptions.md)

## Variables

- [INSTUI\_TRANSPILE\_PACKAGES](variables/INSTUI_TRANSPILE_PACKAGES.md)

## Funcions

- [withPantoken](functions/withPantoken.md)

## Referències

### default

Canvia el nom i re-exporta [withPantoken](functions/withPantoken.md)
