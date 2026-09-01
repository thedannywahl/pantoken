[pantoken](../../../../../index.md) / [plugins/pantoken/simple-icons/src](../index.md) / defaultRegistry

# دالة: defaultRegistry()

> **defaultRegistry**(): `Promise`\<[`SimpleIconsRegistry`](../type-aliases/SimpleIconsRegistry.md)\>

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

استورد `simple-icons` كحزمة بشكل كسول كـ [SimpleIconsRegistry](../type-aliases/SimpleIconsRegistry.md).

## القيم المرجعة

`Promise`\<[`SimpleIconsRegistry`](../type-aliases/SimpleIconsRegistry.md)\>

تصديرات `si*` الخاصة بوحدة `simple-icons`.

## مثال

**زوّد هوك الرموز بالسجل المُحمّل بشكل كسول**

```ts
import { simpleIcons, defaultRegistry } from "@pantoken/plugin-simple-icons";

const registry = await defaultRegistry();
simpleIcons({ registry, slugs: ["github"] });
```
