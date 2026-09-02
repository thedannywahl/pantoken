[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / rehypeGithubAlerts

# Ֆունկցիա: rehypeGithubAlerts()

> **rehypeGithubAlerts**(): (`tree`) => `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Rehype plugin, որը պիտակավորում է GitHub-alert blockquote-ներ: այն հայտնաբերում է `[!NOTE]`-style պիտակ blockquote-ի
սկզբում, այն գրանցում է որպես `data-alert="note"`, և ջնջում է պիտակի տեքստը։ React
`blockquote` բաղադրիչ ապա render անում է InstUI `Alert`։

## Վերադարձվող արժեք

(`tree`) => `void`

## Օրինակ

```tsx
import Markdown from "react-markdown";
import { rehypeGithubAlerts } from "@pantoken/react-markdown";

<Markdown rehypePlugins={[rehypeGithubAlerts]}>{"> [!NOTE]\n> Heads up."}</Markdown>;
```
