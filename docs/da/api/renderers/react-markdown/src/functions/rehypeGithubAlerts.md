[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / rehypeGithubAlerts

# Function: rehypeGithubAlerts()

> **rehypeGithubAlerts**(): (`tree`) => `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Et rehype-plugin, der mærker GitHub-varsel-citattegn: det registrerer en `[!NOTE]`-stilmarkør ved
citattegnets start, registrerer det som `data-alert="note"`, og fjerner markørteksten. React
`blockquote` komponenten gengiver derefter en InstUI `Alert`.

## Returns

(`tree`) => `void`

## Example

```tsx
import Markdown from "react-markdown";
import { rehypeGithubAlerts } from "@pantoken/react-markdown";

<Markdown rehypePlugins={[rehypeGithubAlerts]}>{"> [!NOTE]\n> Heads up."}</Markdown>;
```
