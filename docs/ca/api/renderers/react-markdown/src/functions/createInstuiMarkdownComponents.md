[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / createInstuiMarkdownComponents

# Function: createInstuiMarkdownComponents()

> **createInstuiMarkdownComponents**(`options?`): `Components`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Construir el mapa de components react-markdown per a un conjunt d'opcions de renderització.

## Parameters

### options?

[`InstuiMarkdownRenderOptions`](../interfaces/InstuiMarkdownRenderOptions.md) = `{}`

[InstuiMarkdownRenderOptions](../interfaces/InstuiMarkdownRenderOptions.md).

## Returns

`Components`

Un mapa `components` de react-markdown recolzat per Instructure UI.

## Example

**Passa el mapa directament a react-markdown**

```tsx
import Markdown from "react-markdown";
import { createInstuiMarkdownComponents } from "@pantoken/react-markdown";

const components = createInstuiMarkdownComponents({ tableCaption: "Grades" });
<Markdown components={components}># Report</Markdown>;
```
