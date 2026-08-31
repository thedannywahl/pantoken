[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / globalModifierSelector

# Function: globalModifierSelector()

> **globalModifierSelector**(`p`, `name`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

بناء محدِّد معدِّل الفئة العام: `:where(*).--name.--name.--name`. فئة المعدِّل المكررة 3 مرات تعطي القاعدة (0,3,0)
الخصوصية، التي تتفوق بشكل حتمي على أي مركب معدِّل مكون حقيقي 2-فئة (`.instui-view.-mod`، 0,2,0) بغض
النظر عن ترتيب المصدر — غلاف `:where(*)` لا يساهم بصفر خصوصية بمفرده، لذا فهو توثيق بحت بأن
هذا معدِّل عام، وليس شرط نطاق. محدِّد الفئة البسيط بالفعل يطابق الفئة المستقلة (`--mt-lg` بدون
فئة أخرى) أو متسلسل على أي مكون، أساسي أو تأليف المكون، بدون تعداد لكل مكون مطلوب. يستبدل النمط
القديم من الفئة العارية بالإضافة إلى مركب معدِّل معدود لكل مكون (`globalSelectors`/`chainTargets`)،
الذي لم يتمكن من الوصول إلى المكونات المأليفة وأضاف المكون ولم يكن ليتسع إلى المرافق عالية الأصل مثل التباعد.

## Parameters

### p

`string`

### name

`string`

## Returns

`string`
