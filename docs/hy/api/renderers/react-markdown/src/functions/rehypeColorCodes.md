[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / rehypeColorCodes

# Function: rehypeColorCodes()

> **rehypeColorCodes**(): (`tree`) => `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Rehype plugin, որը ինքնուրույն գույնի արժեքներ ծածկում է `<span data-color-code="…">`-ում, որպեսզի React
շերտը կարող է render անել մի նմուշ։ Արտացոլում է պատկերակ-token pipeline-ը։

## Returns

(`tree`) => `void`

## Example

```tsx
import Markdown from "react-markdown";
import { rehypeColorCodes } from "@pantoken/react-markdown";

<Markdown rehypePlugins={[rehypeColorCodes]}>Brand is #03893D.</Markdown>;
```
