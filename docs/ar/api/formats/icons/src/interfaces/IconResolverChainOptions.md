[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / IconResolverChainOptions

# Interface: IconResolverChainOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

خيارات مشتركة بواسطة عارضات حل الأيقونات ([buildIconResolverChain](../functions/buildIconResolverChain.md)).

## Properties

### resolve?

> `optional` **resolve?**: [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

محل صريح، يتم تجربته قبل مجموعة أيقونات pantoken المدمجة.

---

### plugins?

> `optional` **plugins?**: readonly [`PantokenPlugin`](../../../../packages/core/src/interfaces/PantokenPlugin.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

الإضافات التي توصل hooks `rehype` بها (يتم تجربتها أولاً).
