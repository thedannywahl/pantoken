[pantoken](../../../../index.md) / [bundlers/panda/src](../index.md) / toPandaPreset

# Funció: toPandaPreset()

> **toPandaPreset**(`tokens`): [`PandaPreset`](../interfaces/PandaPreset.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Construeix un preajust Panda a partir d'una IR de fitxa.

## Paràmetres

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

La IR (p. ex. de `@pantoken/tokens`).

## Retorna

[`PandaPreset`](../interfaces/PandaPreset.md)

Un objecte de preajust per a `definePreset` de Panda.

## Exemple

**Construeix un preajust a partir d'una IR personalitzada**

```ts
import { defineConfig } from "@pandacss/dev";
import { toPandaPreset } from "@pantoken/panda";
import { byTheme } from "@pantoken/tokens";

const preset = toPandaPreset(byTheme("rebrand"));
export default defineConfig({ presets: [preset] });
```
