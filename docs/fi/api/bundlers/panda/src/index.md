[pantoken](../../../index.md) / panda

# panda

<span class="instui-pill -color-danger pantoken-doc-tag">Kokeellinen</span>

`@pantoken/panda` — an Instructure design-token preset for Panda CSS.

[toPandaPreset](functions/toPandaPreset.md) converts any IR; [pantokenPreset](variables/pantokenPreset.md) is the ready-made `rebrand` preset.
Spread it into your `panda.config.ts` `presets`, and the `_dark` condition tracks pantoken's
`light-dark()` tokens automatically.

## Esimerkki

**panda.config.ts**

```ts
import { defineConfig } from "@pandacss/dev";
import { pantokenPreset } from "@pantoken/panda";
export default defineConfig({ presets: [pantokenPreset] });
// then: css({ color: "token(colors.color-text-base)" })
```

## Rajapinnat

- [PandaToken](interfaces/PandaToken.md)
- [PandaSemanticToken](interfaces/PandaSemanticToken.md)
- [PandaPreset](interfaces/PandaPreset.md)

## Tyyppialiasit

- [PandaCategory](type-aliases/PandaCategory.md)

## Muuttujat

- [pantokenPreset](variables/pantokenPreset.md)

## Funktionit

- [toPandaPreset](functions/toPandaPreset.md)

## Viittaukset

### default

Renames and re-exports [pantokenPreset](variables/pantokenPreset.md)
