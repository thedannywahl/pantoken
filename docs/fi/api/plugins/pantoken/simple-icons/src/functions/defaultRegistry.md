[pantoken](../../../../../index.md) / [plugins/pantoken/simple-icons/src](../index.md) / defaultRegistry

# Funktio: defaultRegistry()

> **defaultRegistry**(): `Promise`\<[`SimpleIconsRegistry`](../type-aliases/SimpleIconsRegistry.md)\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Lazily import the `simple-icons` package as a [SimpleIconsRegistry](../type-aliases/SimpleIconsRegistry.md).

## Palauttaa

`Promise`\<[`SimpleIconsRegistry`](../type-aliases/SimpleIconsRegistry.md)\>

The `simple-icons` module's `si*` exports.

## Esimerkki

**Feed the lazily-loaded registry into the token hook**

```ts
import { simpleIcons, defaultRegistry } from "@pantoken/plugin-simple-icons";

const registry = await defaultRegistry();
simpleIcons({ registry, slugs: ["github"] });
```
