[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / IconResolverChainOptions

# واجهة: IconResolverChainOptions

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

خيارات مشتركة بين العارضات التي تحل الأيقونات ([buildIconResolverChain](../functions/buildIconResolverChain.md)).

## الخصائص

### resolve?

> `optional` **resolve?**: [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

مُحلل صريح، يُجرَّب قبل مجموعة أيقونات pantoken المدمجة.

***

### plugins?

> `optional` **plugins?**: readonly [`PantokenPlugin`](../../../../packages/core/src/interfaces/PantokenPlugin.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

الإضافات التي تُساهم خطافات `rehype` الخاصة بها في المُحللات (تُجرَّب أولاً).
