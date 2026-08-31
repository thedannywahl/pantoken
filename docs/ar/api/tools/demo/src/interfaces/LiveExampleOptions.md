[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / LiveExampleOptions

# Interface: LiveExampleOptions

كيفية دمج معاينة مباشرة في كل سياج HTML `@example` على صفحات مطابقة.

## Properties

### match

> **match**: (`relativePath`) => `boolean`

التفاف السياجات على الصفحات التي تطابق `env.relativePath` الخاص بـ markdown-it فقط (على سبيل المثال، صفحات API للـ CSS).

#### Parameters

##### relativePath

`string`

#### Returns

`boolean`

---

### wrap

> **wrap**: (`html`, `flags`) => `string`

بناء كتلة المعاينة المضافة بعد كل سياج `html` غير متراكب، من ترميزه وأي رموز `-flag` محللة من سلسلة معلومات السياج.

#### Parameters

##### html

`string`

##### flags

`Set`\<`string`\>

#### Returns

`string`
