[pantoken](../../../../index.md) / [platforms/vanilla/src](../index.md) / variables

# Biến: variables

> `const` **variables**: `Record`\<`string`, `unknown`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Thử nghiệm</span>

The ready-made `rebrand` Vanilla Foundation variables object.

## Ví dụ

**PUT it to a theme's variables.json asset**

```ts
import { variables } from "@pantoken/vanilla";

await fetch("https://community.example.com/api/v2/themes/THEME_ID/assets/variables.json", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(variables),
});
```
