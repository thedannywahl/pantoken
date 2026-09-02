[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / rehypeGithubAlerts

# Функція: rehypeGithubAlerts()

> **rehypeGithubAlerts**(): (`tree`) => `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

A rehype plugin that tags GitHub-alert blockquotes: it detects a `[!NOTE]`-style marker at the
start of a blockquote, records it as `data-alert="note"`, and strips the marker text. The React
`blockquote` component then renders an InstUI `Alert`.

## Повертає

(`tree`) => `void`

## Приклад

```tsx
import Markdown from "react-markdown";
import { rehypeGithubAlerts } from "@pantoken/react-markdown";

<Markdown rehypePlugins={[rehypeGithubAlerts]}>{"> [!NOTE]\n> Heads up."}</Markdown>;
```
