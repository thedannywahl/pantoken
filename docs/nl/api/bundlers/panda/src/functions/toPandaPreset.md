[pantoken](../../../../index.md) / [bundlers/panda/src](../index.md) / toPandaPreset

# Functie: toPandaPreset()

> **toPandaPreset**(`tokens`): [`PandaPreset`](../interfaces/PandaPreset.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimenteel</span>

Build a Panda preset from a token IR.

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

The IR (e.g. from `@pantoken/tokens`).

## Retourneert

[`PandaPreset`](../interfaces/PandaPreset.md)

A preset object for Panda's `definePreset`.

## Voorbeeld

**Build a preset from a custom IR**

```ts
import { defineConfig } from "@pandacss/dev";
import { toPandaPreset } from "@pantoken/panda";
import { byTheme } from "@pantoken/tokens";

const preset = toPandaPreset(byTheme("rebrand"));
export default defineConfig({ presets: [preset] });
```
