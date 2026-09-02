[pantoken](../../../../index.md) / [ai/pantoken-ai/src](../index.md) / scaffoldProject

# Ֆունկցիա: scaffoldProject()

> **scaffoldProject**(`platform`, `dir?`, `options?`): `Promise`\<`string`[]\>

<span class="instui-pill -color-warning pantoken-doc-tag">Ալֆա</span>

Կազմել ստացող նախագիծ հարթակի համար, pantoken արդեն տեղադրված և միացված:

## Պարամետրեր

### platform

`string`

[ScaffoldPlatform](../type-aliases/ScaffoldPlatform.md):

### dir?

`string`

Նպատակային թղթապանակ (լռելյայն `"."`): Դրա բազային անունը (կամ `"pantoken-app"` համար `"."`)
  փոխարինվել է `{{projectName}}`-ի համար ձևանմուշ ֆայլերում:

### options?

`theme`/`mode` ընտրել որ `@pantoken/css` token sheet scaffolded ֆայլերը
  import (լռելյայն `"rebrand"`/`"light"`), կիրառվում են բոլոր հարթակներում: `cdn` ընտրել CDN
  provider `canvas-theme-editor`-ի `theme.css`/`theme.js` կառուցված են համար (լռելյայն jsDelivr);
  անտեսվել են բոլոր այլ հարթակներով:

#### theme?

`ThemeVariant`

#### mode?

`ThemeMode`

#### cdn?

`string`

## Վերադարձվող արժեք

`Promise`\<`string`[]\>

Գրված ուղիները:

## Օրինակ

**Կազմել React ստացողը:**

```ts
import { scaffoldProject } from "@pantoken/scaffold";

scaffoldProject("react", "./my-app");
scaffoldProject("vue", "./my-vue-app", { theme: "canvas" });
```
