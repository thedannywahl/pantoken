[pantoken](../../../../index.md) / [ai/pantoken-ai/src](../index.md) / scaffoldProject

# Function: scaffoldProject()

> **scaffoldProject**(`platform`, `dir?`, `options?`): `Promise`\<`string`[]\>

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Estableix un projecte inicial per a una plataforma, amb pantoken ja instal·lat i connectat.

## Parameters

### platform

`string`

Una [ScaffoldPlatform](../type-aliases/ScaffoldPlatform.md).

### dir?

`string`

El directori destí (per defecte `"."`). El seu nom base (o `"pantoken-app"` per a `"."`)
es substitueix per `{{projectName}}` als fitxers de plantilla.

### options?

`theme`/`mode` seleccionen quin full de fitxes `@pantoken/css` importa els fitxers establerts
(per defecte `"rebrand"`/`"light"`), aplicat a cada plataforma. `cdn` selecciona el proveïdor CDN
`canvas-theme-editor`'s `theme.css`/`theme.js` es construeixen per a (per defecte jsDelivr);
ignorat per cada altra plataforma.

#### theme?

`ThemeVariant`

#### mode?

`ThemeMode`

#### cdn?

`string`

## Returns

`Promise`\<`string`[]\>

Els camins escrits.

## Example

**Estableix un inici de React**

```ts
import { scaffoldProject } from "@pantoken/scaffold";

scaffoldProject("react", "./my-app");
scaffoldProject("vue", "./my-vue-app", { theme: "canvas" });
```
