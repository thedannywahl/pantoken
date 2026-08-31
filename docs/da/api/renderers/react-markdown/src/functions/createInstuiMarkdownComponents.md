[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / createInstuiMarkdownComponents

# Function: createInstuiMarkdownComponents()

> **createInstuiMarkdownComponents**(`options?`): `Components`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Byg react-markdown-komponentkortet for et sæt af gengivelsesvalgmuligheder.

## Parameters

### options?

[`InstuiMarkdownRenderOptions`](../interfaces/InstuiMarkdownRenderOptions.md) = `{}`

[InstuiMarkdownRenderOptions](../interfaces/InstuiMarkdownRenderOptions.md).

## Returns

`Components`

Et react-markdown `components` kort understøttet af Instructure UI.

## Example

**Overfør kortet direkte til react-markdown**

```tsx
import Markdown from "react-markdown";
import { createInstuiMarkdownComponents } from "@pantoken/react-markdown";

const components = createInstuiMarkdownComponents({ tableCaption: "Grades" });
<Markdown components={components}># Report</Markdown>;
```
