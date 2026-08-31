[pantoken](../../../index.md) / docusaurus

# docusaurus

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/docusaurus` — tema un lloc web de Docusaurus amb tokens d'Instructure.

Els estils de Docusaurus provenen de Infima, el tema del qual és controlat per variables CSS `--ifm-*`. Això
apunta als `var(--instui-*)`, per la qual cosa deixar la sortida a `src/css/custom.css` (juntament amb
`@pantoken/css`, que defineix les propietats personalitzades) redefineix els documents amb l'aspecte d'Instructure
mentre que el clar/fosc continua fluint pels mateixos tokens.

## Interfaces

- [ToDocusaurusCssOptions](interfaces/ToDocusaurusCssOptions.md)

## Variables

- [INFIMA\_TO\_INSTUI](variables/INFIMA_TO_INSTUI.md)
- [docusaurusCss](variables/docusaurusCss.md)

## Functions

- [toDocusaurusCss](functions/toDocusaurusCss.md)

## References

### default

Canvia el nom i torna a exportar [docusaurusCss](variables/docusaurusCss.md)
