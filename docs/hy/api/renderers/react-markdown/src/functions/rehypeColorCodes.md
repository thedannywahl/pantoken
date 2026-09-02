[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / rehypeColorCodes

# Ֆունկցիա: rehypeColorCodes()

> **rehypeColorCodes**(): (`tree`) => `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Rehype plugin, որը ինքնուրույն գույնի արժեքներ ծածկում է `<span data-color-code="…">`-ում, որպեսզի React
շերտը կարող է render անել մի նմուշ։ Արտացոլում է պատկերակ-token pipeline-ը։

## Վերադարձվող արժեք

(`tree`) => `void`

## Օրինակ

```tsx
import Markdown from "react-markdown";
import { rehypeColorCodes } from "@pantoken/react-markdown";

<Markdown rehypePlugins={[rehypeColorCodes]}>Brand is #03893D.</Markdown>;
```
