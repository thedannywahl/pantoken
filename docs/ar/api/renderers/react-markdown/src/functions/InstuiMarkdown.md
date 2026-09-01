[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / InstuiMarkdown

# دالة: InstuiMarkdown()

> **InstuiMarkdown**(`props`): `ReactNode`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

عرض Markdown مع تعيينات عناصر واجهة المستخدم لـ Instructure UI ورموز/ألوان الأيقونات في pantoken.

## المعلمات

### props

[`InstuiMarkdownProps`](../interfaces/InstuiMarkdownProps.md)

[InstuiMarkdownProps](../interfaces/InstuiMarkdownProps.md).

## القيم المرجعة

`ReactNode`

## أمثلة

**أساسي**

```tsx
import { InstuiMarkdown } from "@pantoken/react-markdown";

<InstuiMarkdown>{"Go :arrow-left: back. Brand is #03893D.\n\n> [!TIP]\n> Helpful."}</InstuiMarkdown>;
```

**مع أيقونات العلامة التجارية عبر مكوّن إضافي**

```tsx
import { InstuiMarkdown } from "@pantoken/react-markdown";
import { simpleIcons } from "@pantoken/plugin-simple-icons";
import * as registry from "simple-icons";

<InstuiMarkdown renderOptions={{ icons: { plugins: [simpleIcons({ registry })] } }}>
  {"Star us on :github:"}
</InstuiMarkdown>;
```
