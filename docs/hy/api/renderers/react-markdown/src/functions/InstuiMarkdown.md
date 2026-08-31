[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / InstuiMarkdown

# Function: InstuiMarkdown()

> **InstuiMarkdown**(`props`): `ReactNode`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Markdown-ը render անել Instructure UI տարրերի քարտեզագրման և pantoken պատկերակ/գույնի մեջբերումների հետ։

## Parameters

### props

[`InstuiMarkdownProps`](../interfaces/InstuiMarkdownProps.md)

[InstuiMarkdownProps](../interfaces/InstuiMarkdownProps.md).

## Returns

`ReactNode`

## Examples

**Հիմնական**

```tsx
import { InstuiMarkdown } from "@pantoken/react-markdown";

<InstuiMarkdown>
  {"Go :arrow-left: back. Brand is #03893D.\n\n> [!TIP]\n> Helpful."}
</InstuiMarkdown>;
```

**Brand պատկերակներով plugin-ի միջոցով**

```tsx
import { InstuiMarkdown } from "@pantoken/react-markdown";
import { simpleIcons } from "@pantoken/plugin-simple-icons";
import * as registry from "simple-icons";

<InstuiMarkdown renderOptions={{ icons: { plugins: [simpleIcons({ registry })] } }}>
  {"Star us on :github:"}
</InstuiMarkdown>;
```
