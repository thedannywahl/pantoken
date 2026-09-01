[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / createInstuiMarkdownComponents

# دالة: createInstuiMarkdownComponents()

> **createInstuiMarkdownComponents**(`options?`): `Components`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

بناء خريطة مكونات react-markdown لمجموعة من خيارات العرض.

## المعلمات

### options?

[`InstuiMarkdownRenderOptions`](../interfaces/InstuiMarkdownRenderOptions.md) = `{}`

[InstuiMarkdownRenderOptions](../interfaces/InstuiMarkdownRenderOptions.md).

## القيم المرجعة

`Components`

خريطة `components` لِـ react-markdown مدعومة بواسطة Instructure UI.

## مثال

**مرِّر الخريطة مباشرةً إلى react-markdown**

```tsx
import Markdown from "react-markdown";
import { createInstuiMarkdownComponents } from "@pantoken/react-markdown";

const components = createInstuiMarkdownComponents({ tableCaption: "Grades" });
<Markdown components={components}># Report</Markdown>;
```
