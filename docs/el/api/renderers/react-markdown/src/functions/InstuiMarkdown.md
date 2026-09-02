[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / InstuiMarkdown

# Συνάρτηση: InstuiMarkdown()

> **InstuiMarkdown**(`props`): `ReactNode`

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

Render Markdown with Instructure UI element mappings and pantoken icon/color tokens.

## Παράμετροι

### props

[`InstuiMarkdownProps`](../interfaces/InstuiMarkdownProps.md)

[InstuiMarkdownProps](../interfaces/InstuiMarkdownProps.md).

## Επιστρέφει

`ReactNode`

## Παραδείγματα

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
