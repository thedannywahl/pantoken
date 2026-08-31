[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / rehypeColorCodes

# Function: rehypeColorCodes()

> **rehypeColorCodes**(): (`tree`) => `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

مكون إضافي rehype يلف قيم الألوان المستقلة في `<span data-color-code="…">`، بحيث يمكن لطبقة React
عرض عينة. يعكس خط أنابيب رمز الأيقونات.

## Returns

(`tree`) => `void`

## Example

```tsx
import Markdown from "react-markdown";
import { rehypeColorCodes } from "@pantoken/react-markdown";

<Markdown rehypePlugins={[rehypeColorCodes]}>Brand is #03893D.</Markdown>;
```
