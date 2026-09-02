[pantoken](../../../index.md) / panda

# panda

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

`@pantoken/panda` — et Instructure design-token preset til Panda CSS.

[toPandaPreset](functions/toPandaPreset.md) konverterer ethvert IR; [pantokenPreset](variables/pantokenPreset.md) er det færdiglavede `rebrand` preset.
Spred det ind i dit `panda.config.ts` `presets`, og `_dark` betingelsen sporer pantokens
`light-dark()` tokens automatisk.

## Eksempel

**panda.config.ts**

```ts
import { defineConfig } from "@pandacss/dev";
import { pantokenPreset } from "@pantoken/panda";
export default defineConfig({ presets: [pantokenPreset] });
// then: css({ color: "token(colors.color-text-base)" })
```

## Interfaces

- [PandaToken](interfaces/PandaToken.md)
- [PandaSemanticToken](interfaces/PandaSemanticToken.md)
- [PandaPreset](interfaces/PandaPreset.md)

## Typealiaser

- [PandaCategory](type-aliases/PandaCategory.md)

## Variabler

- [pantokenPreset](variables/pantokenPreset.md)

## Funktioner

- [toPandaPreset](functions/toPandaPreset.md)

## Referencer

### default

Omdøber og re-eksporterer [pantokenPreset](variables/pantokenPreset.md)
