[pantoken](../../../../../index.md) / [plugins/pantoken/simple-icons/src](../index.md) / defaultRegistry

# Function: defaultRegistry()

> **defaultRegistry**(): `Promise`\<[`SimpleIconsRegistry`](../type-aliases/SimpleIconsRegistry.md)>>>>\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Importa tardanament el paquet `simple-icons` com a [SimpleIconsRegistry](../type-aliases/SimpleIconsRegistry.md).

## Returns

`Promise`\<[`SimpleIconsRegistry`](../type-aliases/SimpleIconsRegistry.md)\>

Les exportacions `si*` del mòdul `simple-icons`.

## Example

**Alimenta el registre carregat tardanament al ganxo de token**

```ts
import { simpleIcons, defaultRegistry } from "@pantoken/plugin-simple-icons";

const registry = await defaultRegistry();
simpleIcons({ registry, slugs: ["github"] });
```
