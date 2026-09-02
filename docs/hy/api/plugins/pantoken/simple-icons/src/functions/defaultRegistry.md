[pantoken](../../../../../index.md) / [plugins/pantoken/simple-icons/src](../index.md) / defaultRegistry

# Ֆունկցիա: defaultRegistry()

> **defaultRegistry**(): `Promise`\<[`SimpleIconsRegistry`](../type-aliases/SimpleIconsRegistry.md)\>

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Ծանուցական ներմուծել `simple-icons` փաթեթը որպես [SimpleIconsRegistry](../type-aliases/SimpleIconsRegistry.md):

## Վերադարձվող արժեք

`Promise`\<[`SimpleIconsRegistry`](../type-aliases/SimpleIconsRegistry.md)\>

`simple-icons` մոդուլի `si*` արտահանումները:

## Օրինակ

**Սնցել ծանուցական բեռնված ռեգիստրը տոկեն կեռում**

```ts
import { simpleIcons, defaultRegistry } from "@pantoken/plugin-simple-icons";

const registry = await defaultRegistry();
simpleIcons({ registry, slugs: ["github"] });
```
