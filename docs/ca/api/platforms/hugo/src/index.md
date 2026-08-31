[pantoken](../../../index.md) / hugo

# hugo

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/hugo` — emetrà la fulla d'estils de token de l'Instructure per a un lloc Hugo.

Hugo no té cap contracte estàndard de variables de tema, així que això ofereix els tokens com a actius que es poden soltar
sota `assets/` (on Hugo Pipes / Dart Sass els recullen): una parcial Sass i un fitxer CSS plà
(de `@pantoken/scss` i `@pantoken/css`), més una fulla d'estils de prosa estil InstUI (de
`@pantoken/components`) que estilitza el contingut en una regió `.pantoken-prose`.

## Interfaces

- [HugoFile](interfaces/HugoFile.md)

## Functions

- [toHugoAssets](functions/toHugoAssets.md)
