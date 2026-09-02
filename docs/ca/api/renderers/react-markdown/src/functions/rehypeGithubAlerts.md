[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / rehypeGithubAlerts

# Funció: rehypeGithubAlerts()

> **rehypeGithubAlerts**(): (`tree`) => `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Un plugin rehype que marca les blockquotes d'alerta de GitHub: detecta un marcador de tipus `[!NOTE]` al
princip d'una blockquote, el registra com a `data-alert="note"` i elimina el text del marcador. El component React
`blockquote` llavors renderitza un `Alert` d'InstUI.

## Retorna

(`tree`) => `void`

## Exemple

```tsx
import Markdown from "react-markdown";
import { rehypeGithubAlerts } from "@pantoken/react-markdown";

<Markdown rehypePlugins={[rehypeGithubAlerts]}>{"> [!NOTE]\n> Heads up."}</Markdown>;
```
