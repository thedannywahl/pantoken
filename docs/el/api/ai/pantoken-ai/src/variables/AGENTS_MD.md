[pantoken](../../../../index.md) / [ai/pantoken-ai/src](../index.md) / AGENTS\_MD

# Μεταβλητή: AGENTS\_MD

> `const` **AGENTS\_MD**: `string` = `ASSETS.agents`

<span class="instui-pill -color-warning pantoken-doc-tag">Άλφα</span>

The `AGENTS.md` content (consumer usage guide).

## Παράδειγμα

**Serve the guide from an app route**

```ts
import { AGENTS_MD } from "@pantoken/ai";

export function GET() {
  return new Response(AGENTS_MD, { headers: { "Content-Type": "text/markdown" } });
}
```
