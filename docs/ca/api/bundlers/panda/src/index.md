[pantoken](../../../index.md) / panda

# panda

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/panda` — un preajust de fitxa de disseny d'Instructure per a Panda CSS.

[toPandaPreset](functions/toPandaPreset.md) converteix qualsevol IR; [pantokenPreset](variables/pantokenPreset.md) és el preset `rebrand` preparat.
Espandiu-lo a la vostra `panda.config.ts` `presets`, i la condició `_dark` fa un seguiment dels tokens `light-dark()` de pantoken
automàticament.

## Exemple

**panda.config.ts**

```ts
import { defineConfig } from "@pandacss/dev";
import { pantokenPreset } from "@pantoken/panda";
export default defineConfig({ presets: [pantokenPreset] });
// then: css({ color: "token(colors.color-text-base)" })
```

## Interfícies

- [PandaToken](interfaces/PandaToken.md)
- [PandaSemanticToken](interfaces/PandaSemanticToken.md)
- [PandaPreset](interfaces/PandaPreset.md)

## Àlies de tipus

- [PandaCategory](type-aliases/PandaCategory.md)

## Variables

- [pantokenPreset](variables/pantokenPreset.md)

## Funcions

- [toPandaPreset](functions/toPandaPreset.md)

## Referències

### default

Canvia de nom i reexporta [pantokenPreset](variables/pantokenPreset.md)
