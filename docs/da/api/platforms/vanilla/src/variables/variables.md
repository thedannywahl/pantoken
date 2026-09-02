[pantoken](../../../../index.md) / [platforms/vanilla/src](../index.md) / variables

# Variabel: variables

> `const` **variables**: `Record`\<`string`, `unknown`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Det færdige `rebrand` Vanilla Foundation-variabelobjekt.

## Eksempel

**PUT det til et tema's variables.json-aktiv**

```ts
import { variables } from "@pantoken/vanilla";

await fetch("https://community.example.com/api/v2/themes/THEME_ID/assets/variables.json", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(variables),
});
```
