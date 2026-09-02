[pantoken](../../../../../index.md) / [plugins/pantoken/simple-icons/src](../index.md) / defaultRegistry

# Συνάρτηση: defaultRegistry()

> **defaultRegistry**(): `Promise`\<[`SimpleIconsRegistry`](../type-aliases/SimpleIconsRegistry.md)\>

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

Lazily import the `simple-icons` package as a [SimpleIconsRegistry](../type-aliases/SimpleIconsRegistry.md).

## Επιστρέφει

`Promise`\<[`SimpleIconsRegistry`](../type-aliases/SimpleIconsRegistry.md)\>

The `simple-icons` module's `si*` exports.

## Παράδειγμα

**Feed the lazily-loaded registry into the token hook**

```ts
import { simpleIcons, defaultRegistry } from "@pantoken/plugin-simple-icons";

const registry = await defaultRegistry();
simpleIcons({ registry, slugs: ["github"] });
```
