[pantoken](../../../index.md) / panda

# panda

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/panda` — et Instructure design-token preset til Panda CSS.

[toPandaPreset](functions/toPandaPreset.md) konverterer ethvert IR; [pantokenPreset](variables/pantokenPreset.md) er det færdiglavede `rebrand` preset.
Spred det ind i dit `panda.config.ts` `presets`, og `_dark` betingelsen sporer pantokens
`light-dark()` tokens automatisk.

## Example

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

## Type Aliases

- [PandaCategory](type-aliases/PandaCategory.md)

## Variables

- [pantokenPreset](variables/pantokenPreset.md)

## Functions

- [toPandaPreset](functions/toPandaPreset.md)

## References

### default

Omdøber og re-eksporterer [pantokenPreset](variables/pantokenPreset.md)
