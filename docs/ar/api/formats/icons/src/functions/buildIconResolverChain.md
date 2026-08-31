[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / buildIconResolverChain

# Function: buildIconResolverChain()

> **buildIconResolverChain**(`options`): [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

بناء سلسلة محل الأيقونات المشتركة: أولاً محل الإضافة `rehype`، ثم
`resolve` صريح، ثم مجموعة أيقونات pantoken المدمجة. يستخدمها `@pantoken/rehype` و
`@pantoken/markdown-it` بحيث يبقى ترتيب الدقة متطابقاً عبر العارضات.

## Parameters

### options

[`IconResolverChainOptions`](../interfaces/IconResolverChainOptions.md)

## Returns

[`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

## Example

```ts
import { buildIconResolverChain } from "@pantoken/icons";

const resolveIcon = buildIconResolverChain({ plugins: [myBrandIconsPlugin] });
resolveIcon("arrow-left"); // { name, svg, viewBox, source } | undefined
```
