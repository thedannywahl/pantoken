[pantoken](../../../../index.md) / [ai/pantoken-ai/src](../index.md) / scaffoldProject

# Fonction: scaffoldProject()

> **scaffoldProject**(`platform`, `dir?`, `options?`): `Promise`\<`string`[]\>

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Scaffold a starter project for a platform, with pantoken already installed and wired in.

## Paramètres

### platform

`string`

A [ScaffoldPlatform](../type-aliases/ScaffoldPlatform.md).

### dir?

`string`

The target directory (default `"."`). Its basename (or `"pantoken-app"` for `"."`)
  is substituted for `{{projectName}}` in the template files.

### options?

`theme`/`mode` select which `@pantoken/css` token sheet scaffolded files
  import (default `"rebrand"`/`"light"`), applied across every platform. `cdn` selects the CDN
  provider `canvas-theme-editor`'s `theme.css`/`theme.js` are built for (default jsDelivr);
  ignored by every other platform.

#### theme?

`ThemeVariant`

#### mode?

`ThemeMode`

#### cdn?

`string`

## Retourne

`Promise`\<`string`[]\>

The paths written.

## Exemple

**Scaffold a React starter**

```ts
import { scaffoldProject } from "@pantoken/scaffold";

scaffoldProject("react", "./my-app");
scaffoldProject("vue", "./my-vue-app", { theme: "canvas" });
```
