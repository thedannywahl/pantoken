[pantoken](../../../../../index.md) / [plugins/pantoken/simple-icons/src](../index.md) / defaultRegistry

# Función: defaultRegistry()

> **defaultRegistry**(): `Promise`\<[`SimpleIconsRegistry`](../type-aliases/SimpleIconsRegistry.md)\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Lazily import the `simple-icons` package as a [SimpleIconsRegistry](../type-aliases/SimpleIconsRegistry.md).

## Devuelve

`Promise`\<[`SimpleIconsRegistry`](../type-aliases/SimpleIconsRegistry.md)\>

The `simple-icons` module's `si*` exports.

## Ejemplo

**Feed the lazily-loaded registry into the token hook**

```ts
import { simpleIcons, defaultRegistry } from "@pantoken/plugin-simple-icons";

const registry = await defaultRegistry();
simpleIcons({ registry, slugs: ["github"] });
```
