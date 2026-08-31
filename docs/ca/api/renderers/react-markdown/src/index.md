[pantoken](../../../index.md) / react-markdown

# react-markdown

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/react-markdown` — renderitzar Markdown amb components de Instructure UI i icones de pantoken.

L'entrada per defecte renderitza Markdown amb sabor GitHub, tokens `:icon:` en línia (a través de
`@pantoken/rehype` + `@pantoken/icons`), mostres de codi de color i alertes de l'estil GitHub. El proveïdor MDX
viu a `@pantoken/react-markdown/mdx`.

## Interfaces

- [InstuiMarkdownRenderOptions](interfaces/InstuiMarkdownRenderOptions.md)
- [InstuiMarkdownProps](interfaces/InstuiMarkdownProps.md)

## Type Aliases

- [AlertMarker](type-aliases/AlertMarker.md)

## Variables

- [instuiMarkdownComponents](variables/instuiMarkdownComponents.md)

## Functions

- [createInstuiMarkdownComponents](functions/createInstuiMarkdownComponents.md)
- [buildIconResolver](functions/buildIconResolver.md)
- [parseAlertMarker](functions/parseAlertMarker.md)
- [isColorValue](functions/isColorValue.md)
- [rehypeColorCodes](functions/rehypeColorCodes.md)
- [rehypeGithubAlerts](functions/rehypeGithubAlerts.md)
- [InstuiMarkdown](functions/InstuiMarkdown.md)
