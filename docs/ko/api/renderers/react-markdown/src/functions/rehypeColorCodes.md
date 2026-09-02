[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / rehypeColorCodes

# 함수: rehypeColorCodes()

> **rehypeColorCodes**(): (`tree`) => `void`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

A rehype plugin that wraps standalone color values in `<span data-color-code="…">`, so the React
layer can render a swatch. Mirrors the icon-token pipeline.

## 반환값

(`tree`) => `void`

## 예제

```tsx
import Markdown from "react-markdown";
import { rehypeColorCodes } from "@pantoken/react-markdown";

<Markdown rehypePlugins={[rehypeColorCodes]}>Brand is #03893D.</Markdown>;
```
