[pantoken](../../../../index.md) / [ai/pantoken-ai/src](../index.md) / scaffoldAndInit

# Funzione: scaffoldAndInit()

> **scaffoldAndInit**(`platform`, `dir?`, `tool?`): `Promise`\<`string`[]\>

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Scaffold a starter project for a platform (via `@pantoken/scaffold`), and install pantoken's
agent assets (via [installAgentAssets](installAgentAssets.md)) into the same directory.

## Parametri

### platform

`string`

A [ScaffoldPlatform](../type-aliases/ScaffoldPlatform.md).

### dir?

`string` = `"."`

The target directory (default `"."`). Its basename (or `"pantoken-app"` for `"."`)
  is substituted for `{{projectName}}` in the scaffold's template files.

### tool?

[`AgentTool`](../type-aliases/AgentTool.md) \| `"all"`

Which agent tool's assets to install alongside the scaffold (default `"all"`).

## Restituisce

`Promise`\<`string`[]\>

The paths written, scaffold files first.

## Esempio

**Scaffold a React starter with every agent asset installed**

```ts
import { scaffoldAndInit } from "@pantoken/ai";

scaffoldAndInit("react", "./my-app");
```
