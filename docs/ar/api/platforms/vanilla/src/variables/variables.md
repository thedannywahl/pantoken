[pantoken](../../../../index.md) / [platforms/vanilla/src](../index.md) / variables

# متغير: variables

> `const` **variables**: `Record`\<`string`, `unknown`\>

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

كائن متغيرات Vanilla Foundation الجاهز `rebrand`.

## مثال

**ضعه في ملف variables.json الخاص بالثيم**

```ts
import { variables } from "@pantoken/vanilla";

await fetch("https://community.example.com/api/v2/themes/THEME_ID/assets/variables.json", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(variables),
});
```
