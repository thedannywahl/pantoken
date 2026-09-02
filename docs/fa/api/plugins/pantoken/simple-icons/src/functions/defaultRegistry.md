[pantoken](../../../../../index.md) / [plugins/pantoken/simple-icons/src](../index.md) / defaultRegistry

# تابع: defaultRegistry()

> **defaultRegistry**(): `Promise`\<[`SimpleIconsRegistry`](../type-aliases/SimpleIconsRegistry.md)\>

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

Lazily import the `simple-icons` package as a [SimpleIconsRegistry](../type-aliases/SimpleIconsRegistry.md).

## مقدار بازگشتی

`Promise`\<[`SimpleIconsRegistry`](../type-aliases/SimpleIconsRegistry.md)\>

The `simple-icons` module's `si*` exports.

## نمونه

**Feed the lazily-loaded registry into the token hook**

```ts
import { simpleIcons, defaultRegistry } from "@pantoken/plugin-simple-icons";

const registry = await defaultRegistry();
simpleIcons({ registry, slugs: ["github"] });
```
