[pantoken](../../../../index.md) / [ai/pantoken-ai/src](../index.md) / scaffoldProject

# Function: scaffoldProject()

> **scaffoldProject**(`platform`, `dir?`, `options?`): `Promise`\<`string`[]\>

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Stil et starterproject for en platform op, med pantoken allerede installeret og forbundet.

## Parameters

### platform

`string`

En [ScaffoldPlatform](../type-aliases/ScaffoldPlatform.md).

### dir?

`string`

Målmappen (standard `"."`). Dens basename (eller `"pantoken-app"` for `"."`)
erstattes af `{{projectName}}` i skabelonfilerne.

### options?

`theme`/`mode` vælg hvilken `@pantoken/css` token-ark stilladsets filer
importerer (standard `"rebrand"`/`"light"`), anvendt på alle platforme. `cdn` vælger CDN-
udbyderen `canvas-theme-editor`'s `theme.css`/`theme.js` er bygget til (standard jsDelivr);
ignoreret af alle andre platforme.

#### theme?

`ThemeVariant`

#### mode?

`ThemeMode`

#### cdn?

`string`

## Returns

`Promise`\<`string`[]\>

De skrevne stier.

## Example

**Stil en React-starter op**

```ts
import { scaffoldProject } from "@pantoken/scaffold";

scaffoldProject("react", "./my-app");
scaffoldProject("vue", "./my-vue-app", { theme: "canvas" });
```
