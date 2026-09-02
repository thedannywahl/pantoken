[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / rehypeColorCodes

# 函式: rehypeColorCodes()

> **rehypeColorCodes**(): (`tree`) => `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

A rehype plugin that wraps standalone color values in `<span data-color-code="…">`, so the React
layer can render a swatch. Mirrors the icon-token pipeline.

## 回傳

(`tree`) => `void`

## 範例

```tsx
import Markdown from "react-markdown";
import { rehypeColorCodes } from "@pantoken/react-markdown";

<Markdown rehypePlugins={[rehypeColorCodes]}>Brand is #03893D.</Markdown>;
```
