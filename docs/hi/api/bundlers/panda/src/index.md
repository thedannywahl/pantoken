[pantoken](../../../index.md) / panda

# panda

<span class="instui-pill -color-danger pantoken-doc-tag">प्रयोगात्मक</span>

`@pantoken/panda` — an Instructure design-token preset for Panda CSS.

[toPandaPreset](functions/toPandaPreset.md) converts any IR; [pantokenPreset](variables/pantokenPreset.md) is the ready-made `rebrand` preset.
Spread it into your `panda.config.ts` `presets`, and the `_dark` condition tracks pantoken's
`light-dark()` tokens automatically.

## उदाहरण

**panda.config.ts**

```ts
import { defineConfig } from "@pandacss/dev";
import { pantokenPreset } from "@pantoken/panda";
export default defineConfig({ presets: [pantokenPreset] });
// then: css({ color: "token(colors.color-text-base)" })
```

## इंटरफेस

- [PandaToken](interfaces/PandaToken.md)
- [PandaSemanticToken](interfaces/PandaSemanticToken.md)
- [PandaPreset](interfaces/PandaPreset.md)

## टाइप एलियास

- [PandaCategory](type-aliases/PandaCategory.md)

## वैरिएबल्स

- [pantokenPreset](variables/pantokenPreset.md)

## फंक्शन्स

- [toPandaPreset](functions/toPandaPreset.md)

## संदर्भ

### default

Renames and re-exports [pantokenPreset](variables/pantokenPreset.md)
