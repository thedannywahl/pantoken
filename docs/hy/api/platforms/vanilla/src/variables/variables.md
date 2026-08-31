[pantoken](../../../../index.md) / [platforms/vanilla/src](../index.md) / variables

# Variable: variables

> `const` **variables**: `Record`\<`string`, `unknown`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Պատրաստ `rebrand` Vanilla Foundation փոփոխականների օբյեկտ:

## Example

**Այն դրեք թեմայի variables.json ակտիվի մեջ**

```ts
import { variables } from "@pantoken/vanilla";

await fetch("https://community.example.com/api/v2/themes/THEME_ID/assets/variables.json", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(variables),
});
```
