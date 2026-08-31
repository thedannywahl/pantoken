[pantoken](../../../../../index.md) / [plugins/pantoken/simple-icons/src](../index.md) / defaultRegistry

# Function: defaultRegistry()

> **defaultRegistry**(): `Promise`\<[`SimpleIconsRegistry`](../type-aliases/SimpleIconsRegistry.md)>>>>\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Lazily import the `simple-icons` package as a [SimpleIconsRegistry](../type-aliases/SimpleIconsRegistry.md).

## Returns

`Promise`\<[`SimpleIconsRegistry`](../type-aliases/SimpleIconsRegistry.md)\>

The `simple-icons` module's `si*` exports.

## Example

**Feed the lazily-loaded registry into the token hook**

```ts
import { simpleIcons, defaultRegistry } from "@pantoken/plugin-simple-icons";

const registry = await defaultRegistry();
simpleIcons({ registry, slugs: ["github"] });
```
