[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / rehypeColorCodes

# Funció: rehypeColorCodes()

> **rehypeColorCodes**(): (`tree`) => `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Un plugin rehype que embala valors de color autònoms en `<span data-color-code="…">`, de manera que la capa React
pugui renderitzar una mostra. Reflecteix la canonada de token d'icona.

## Retorna

(`tree`) => `void`

## Exemple

```tsx
import Markdown from "react-markdown";
import { rehypeColorCodes } from "@pantoken/react-markdown";

<Markdown rehypePlugins={[rehypeColorCodes]}>Brand is #03893D.</Markdown>;
```
