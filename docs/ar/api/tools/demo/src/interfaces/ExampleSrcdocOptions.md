[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / ExampleSrcdocOptions

# واجهة: ExampleSrcdocOptions

خيارات لـ [buildExampleSrcdoc](../functions/buildExampleSrcdoc.md).

## الخصائص

### cssUrls

> **cssUrls**: readonly `string`[]

عناوين URL لملفات الأنماط لتحميلها في `&lt;head&gt;` للـ iframe (tokens, components, utilities, icons, …).

***

### card?

> `optional` **card?**: `boolean`

لفّ `html` داخل سطح `.instui-card` المشترك (الافتراضي `true`).

***

### dir?

> `optional` **dir?**: `"ltr"` \| `"rtl"`

اتجاه النص في `&lt;html&gt;` للوثيقة المعزولة (الافتراضي `"ltr"`) — srcdoc لا يرثه أبدًا من الصفحة الحاوية.
