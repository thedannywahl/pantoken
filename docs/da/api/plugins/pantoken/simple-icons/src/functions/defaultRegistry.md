[pantoken](../../../../../index.md) / [plugins/pantoken/simple-icons/src](../index.md) / defaultRegistry

# Funktion: defaultRegistry()

> **defaultRegistry**(): `Promise`\<[`SimpleIconsRegistry`](../type-aliases/SimpleIconsRegistry.md)\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Doven indlæsning af `simple-icons` pakken som et [SimpleIconsRegistry](../type-aliases/SimpleIconsRegistry.md).

## Returnerer

`Promise`\<[`SimpleIconsRegistry`](../type-aliases/SimpleIconsRegistry.md)\>

Modulet `simple-icons`s `si*` eksporter.

## Eksempel

**Føj det doven-indlæste register til token-hooket**

```ts
import { simpleIcons, defaultRegistry } from "@pantoken/plugin-simple-icons";

const registry = await defaultRegistry();
simpleIcons({ registry, slugs: ["github"] });
```
