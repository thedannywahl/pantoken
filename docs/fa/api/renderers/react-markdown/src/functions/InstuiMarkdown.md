[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / InstuiMarkdown

# تابع: InstuiMarkdown()

> **InstuiMarkdown**(`props`): `ReactNode`

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

Render Markdown with Instructure UI element mappings and pantoken icon/color tokens.

## پارامترها

### props

[`InstuiMarkdownProps`](../interfaces/InstuiMarkdownProps.md)

[InstuiMarkdownProps](../interfaces/InstuiMarkdownProps.md).

## مقدار بازگشتی

`ReactNode`

## نمونه‌ها

**Basic**

```tsx
import { InstuiMarkdown } from "@pantoken/react-markdown";

<InstuiMarkdown>{"Go :arrow-left: back. Brand is #03893D.\n\n> [!TIP]\n> Helpful."}</InstuiMarkdown>;
```

**With brand icons via a plugin**

```tsx
import { InstuiMarkdown } from "@pantoken/react-markdown";
import { simpleIcons } from "@pantoken/plugin-simple-icons";
import * as registry from "simple-icons";

<InstuiMarkdown renderOptions={{ icons: { plugins: [simpleIcons({ registry })] } }}>
  {"Star us on :github:"}
</InstuiMarkdown>;
```
