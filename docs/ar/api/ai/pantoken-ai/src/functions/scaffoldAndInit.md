[pantoken](../../../../index.md) / [ai/pantoken-ai/src](../index.md) / scaffoldAndInit

# دالة: scaffoldAndInit()

> **scaffoldAndInit**(`platform`, `dir?`, `tool?`): `Promise`\<`string`[]\>

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

هيكل مشروع بداية لمنصة (عبر `@pantoken/scaffold`)، وتثبيت أصول وكيل pantoken (عبر [installAgentAssets](installAgentAssets.md)) في نفس الدليل.

## المعلمات

### platform

`string`

منصة [ScaffoldPlatform](../type-aliases/ScaffoldPlatform.md).

### dir?

`string` = `"."`

الدليل المستهدف (الافتراضي `"."`). اسمه الأساسي (أو `"pantoken-app"` لـ `"."`)
  يُستبدل بـ `{{projectName}}` في ملفات قالب الهيكل.

### tool?

[`AgentTool`](../type-aliases/AgentTool.md) \| `"all"`

أي أصول أداة الوكيل التي تُثبّت جنبًا إلى جنب مع الهيكل (الافتراضي `"all"`).

## القيم المرجعة

`Promise`\<`string`[]\>

المسارات المكتوبة، ملفات الهيكل أولًا.

## مثال

**إنشاء مشروع React ابتدائي مع تثبيت جميع أصول الوكيل**

```ts
import { scaffoldAndInit } from "@pantoken/ai";

scaffoldAndInit("react", "./my-app");
```
