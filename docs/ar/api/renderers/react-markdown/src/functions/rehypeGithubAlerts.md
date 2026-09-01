[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / rehypeGithubAlerts

# دالة: rehypeGithubAlerts()

> **rehypeGithubAlerts**(): (`tree`) => `void`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

مكوّن rehype إضافي يوسم اقتباسات التنبيه في GitHub: يكتشف وسمًا على نمط `[!NOTE]` في
بداية الاقتباس، ويسجله كـ `data-alert="note"`، ويزيل نص الوسم. ثم يقوم مكوّن React
`blockquote` بعرض عنصر InstUI `Alert`.

## القيم المرجعة

(`tree`) => `void`

## مثال

```tsx
import Markdown from "react-markdown";
import { rehypeGithubAlerts } from "@pantoken/react-markdown";

<Markdown rehypePlugins={[rehypeGithubAlerts]}>{"> [!NOTE]\n> Heads up."}</Markdown>;
```
