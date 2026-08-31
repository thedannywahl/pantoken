[pantoken](../../../../../index.md) / [plugins/pantoken/simple-icons/src](../index.md) / defaultRegistry

# Function: defaultRegistry()

> **defaultRegistry**(): `Promise`\<[`SimpleIconsRegistry`](../type-aliases/SimpleIconsRegistry.md)\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Ծանուցական ներմուծել `simple-icons` փաթեթը որպես [SimpleIconsRegistry](../type-aliases/SimpleIconsRegistry.md):

## Returns

`Promise`\<[`SimpleIconsRegistry`](../type-aliases/SimpleIconsRegistry.md)\>

`simple-icons` մոդուլի `si*` արտահանումները:

## Example

**Սնցել ծանուցական բեռնված ռեգիստրը տոկեն կեռում**

```ts
import { simpleIcons, defaultRegistry } from "@pantoken/plugin-simple-icons";

const registry = await defaultRegistry();
simpleIcons({ registry, slugs: ["github"] });
```
