[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / rehypeGithubAlerts

# Function: rehypeGithubAlerts()

> **rehypeGithubAlerts**(): (`tree`) => `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

مكون إضافي rehype يعلم اقتباسات GitHub-alert بالعلامات: يكتشف علامة بأسلوب `[!NOTE]` في
bداية اقتباس كتلة، ويسجلها كـ `data-alert="note"`، ويزيل نص العلامة. ثم يقوم مكون React `blockquote`
بعرض `Alert` في InstUI.

## Returns

(`tree`) => `void`

## Example

```tsx
import Markdown from "react-markdown";
import { rehypeGithubAlerts } from "@pantoken/react-markdown";

<Markdown rehypePlugins={[rehypeGithubAlerts]}>{"> [!NOTE]\n> Heads up."}</Markdown>;
```
