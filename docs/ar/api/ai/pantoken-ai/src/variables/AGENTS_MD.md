[pantoken](../../../../index.md) / [ai/pantoken-ai/src](../index.md) / AGENTS\_MD

# Variable: AGENTS\_MD

> `const` **AGENTS\_MD**: `string` = `ASSETS.agents`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

محتوى `AGENTS.md` (دليل الاستخدام للمستهلك).

## Example

**خدمة الدليل من مسار التطبيق**

```ts
import { AGENTS_MD } from "@pantoken/ai";

export function GET() {
  return new Response(AGENTS_MD, { headers: { "Content-Type": "text/markdown" } });
}
```
