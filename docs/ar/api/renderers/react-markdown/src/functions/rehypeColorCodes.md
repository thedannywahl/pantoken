[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / rehypeColorCodes

# دالة: rehypeColorCodes()

> **rehypeColorCodes**(): (`tree`) => `void`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

ملحق rehype يقوم بلف قيم الألوان المستقلة في `<span data-color-code="…">`، حتى تتمكن طبقة React
من عرض عينة ألوان. يعكس خط أنابيب icon-token.

## القيم المرجعة

(`tree`) => `void`

## مثال

```tsx
import Markdown from "react-markdown";
import { rehypeColorCodes } from "@pantoken/react-markdown";

<Markdown rehypePlugins={[rehypeColorCodes]}>Brand is #03893D.</Markdown>;
```
