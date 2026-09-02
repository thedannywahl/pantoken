[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / createInstuiMarkdownComponents

# Ֆունկցիա: createInstuiMarkdownComponents()

> **createInstuiMarkdownComponents**(`options?`): `Components`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Կազմել react-markdown բաղադրիչ քարտեզ render ընտրանքների հավաքածուի համար։

## Պարամետրեր

### options?

[`InstuiMarkdownRenderOptions`](../interfaces/InstuiMarkdownRenderOptions.md) = `{}`

[InstuiMarkdownRenderOptions](../interfaces/InstuiMarkdownRenderOptions.md).

## Վերադարձվող արժեք

`Components`

React-markdown `components` քարտեզ Instructure UI-ի հետևակցությամբ։

## Օրինակ

**Քարտեզը ուղղակիորեն անցեք react-markdown-ին**

```tsx
import Markdown from "react-markdown";
import { createInstuiMarkdownComponents } from "@pantoken/react-markdown";

const components = createInstuiMarkdownComponents({ tableCaption: "Grades" });
<Markdown components={components}># Report</Markdown>;
```
