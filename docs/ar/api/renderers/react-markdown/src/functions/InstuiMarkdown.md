[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / InstuiMarkdown

# Function: InstuiMarkdown()

> **InstuiMarkdown**(`props`): `ReactNode`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

عرض Markdown مع تعيينات عناصر Instructure UI ورموز الأيقونات والألوان في pantoken.

## Parameters

### props

[`InstuiMarkdownProps`](../interfaces/InstuiMarkdownProps.md)

[InstuiMarkdownProps](../interfaces/InstuiMarkdownProps.md).

## Returns

`ReactNode`

## Examples

**أساسي**

```tsx
import { InstuiMarkdown } from "@pantoken/react-markdown";

<InstuiMarkdown>
  {"Go :arrow-left: back. Brand is #03893D.\n\n> [!TIP]\n> Helpful."}
</InstuiMarkdown>;
```

**مع أيقونات العلامة التجارية عبر مكون إضافي**

```tsx
import { InstuiMarkdown } from "@pantoken/react-markdown";
import { simpleIcons } from "@pantoken/plugin-simple-icons";
import * as registry from "simple-icons";

<InstuiMarkdown renderOptions={{ icons: { plugins: [simpleIcons({ registry })] } }}>
  {"Star us on :github:"}
</InstuiMarkdown>;
```
