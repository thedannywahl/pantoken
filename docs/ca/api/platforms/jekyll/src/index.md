[pantoken](../../../index.md) / jekyll

# jekyll

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/jekyll` — emetrà la fulla d'estils de token de l'Instructure per a un lloc Jekyll.

Jekyll no té cap contracte estàndard de variables de tema, així que això ofereix els tokens com a actius que es poden soltar:
una parcial Sass per a `_sass/` (importeu-la de la vostra fulla d'estils principal) i un fitxer CSS plà per a
`assets/css/` (de `@pantoken/scss` i `@pantoken/css`), més una fulla d'estils de prosa estil InstUI
(de `@pantoken/components`) que estilitza el contingut en una regió `.pantoken-prose`.

## Interfaces

- [JekyllFile](interfaces/JekyllFile.md)

## Functions

- [toJekyllAssets](functions/toJekyllAssets.md)
