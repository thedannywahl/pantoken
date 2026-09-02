[pantoken](../../../index.md) / react-markdown

# react-markdown

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

`@pantoken/react-markdown` — render Markdown with Instructure UI components and pantoken icons.

The default entry renders GitHub-Flavored Markdown, inline `:icon:` tokens (via
`@pantoken/rehype` + `@pantoken/icons`), color-code swatches, and GitHub-style alerts. The MDX
provider lives at `@pantoken/react-markdown/mdx`.

## Интерфейсы

- [InstuiMarkdownRenderOptions](interfaces/InstuiMarkdownRenderOptions.md)
- [InstuiMarkdownProps](interfaces/InstuiMarkdownProps.md)

## Псевдонимы типов

- [AlertMarker](type-aliases/AlertMarker.md)

## Переменные

- [instuiMarkdownComponents](variables/instuiMarkdownComponents.md)

## Функции

- [createInstuiMarkdownComponents](functions/createInstuiMarkdownComponents.md)
- [buildIconResolver](functions/buildIconResolver.md)
- [parseAlertMarker](functions/parseAlertMarker.md)
- [isColorValue](functions/isColorValue.md)
- [rehypeColorCodes](functions/rehypeColorCodes.md)
- [rehypeGithubAlerts](functions/rehypeGithubAlerts.md)
- [InstuiMarkdown](functions/InstuiMarkdown.md)
