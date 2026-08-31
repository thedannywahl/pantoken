[pantoken](../../../../index.md) / [ai/pantoken-ai/src](../index.md) / scaffoldAndInit

# Function: scaffoldAndInit()

> **scaffoldAndInit**(`platform`, `dir?`, `tool?`): `Promise`\<`string`[]\>

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

قم بحفر مشروع بدء لمنصة (عبر `@pantoken/scaffold`)، وتثبيت موارد وكيل pantoken (عبر [installAgentAssets](installAgentAssets.md)) في نفس المجلد.

## Parameters

### platform

`string`

منصة حفر [ScaffoldPlatform](../type-aliases/ScaffoldPlatform.md).

### dir?

`string` = `"."`

الدليل المستهدف (الافتراضي `"."`). اسمه الأساسي (أو `"pantoken-app"` لـ `"."`) يتم استبداله بـ `{{projectName}}` في ملفات قالب الحفر.

### tool?

[`AgentTool`](../type-aliases/AgentTool.md) \| `"all"`

موارد أداة الوكيل المراد تثبيتها جنباً إلى جنب مع الحفر (الافتراضي `"all"`).

## Returns

`Promise`\<`string`[]\>

المسارات المكتوبة، ملفات الحفر أولاً.

## Example

**حفر بدء React مع تثبيت كل موارد الوكيل**

```ts
import { scaffoldAndInit } from "@pantoken/ai";

scaffoldAndInit("react", "./my-app");
```
