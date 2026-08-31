[pantoken](../../../index.md) / shadcn

# shadcn

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/shadcn` — tema shadcn/ui amb tokens de Instructure.

[toShadcnCss](functions/toShadcnCss.md) emet un bloc `:root` que apunta les variables CSS de shadcn a `var(--instui-*)`.
Coloca-ho juntament amb `@pantoken/css` (que defineix les propietats personalitzades) i els components de shadcn
adopten l'aspecte d'Instructure. Els icones s'alineen automàticament — tant shadcn com Instructure utilitzen Lucide.

## Interfaces

- [ToShadcnCssOptions](interfaces/ToShadcnCssOptions.md)

## Variables

- [shadcnCss](variables/shadcnCss.md)
- [SHADCN\_TO\_INSTUI](variables/SHADCN_TO_INSTUI.md)

## Functions

- [toShadcnCss](functions/toShadcnCss.md)

## References

### default

Canvia el nom i reexporta [shadcnCss](variables/shadcnCss.md)
