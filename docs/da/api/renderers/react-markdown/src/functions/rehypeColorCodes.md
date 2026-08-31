[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / rehypeColorCodes

# Function: rehypeColorCodes()

> **rehypeColorCodes**(): (`tree`) => `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Et rehype-plugin, der omslutter selvstændige farveværdier i `<span data-color-code="…">`, så React-laget
kan gengive en farveprøve. Spejler ikon-token-pipelinen.

## Returns

(`tree`) => `void`

## Example

```tsx
import Markdown from "react-markdown";
import { rehypeColorCodes } from "@pantoken/react-markdown";

<Markdown rehypePlugins={[rehypeColorCodes]}>Brand is #03893D.</Markdown>;
```
