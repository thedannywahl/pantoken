[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / alert

# Variable: alert

> `const` **alert**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-alert&gt;` — رسالة حالة مدمجة مع `role="alert"`. ترسم السمة `variant` إلى معدِّل `-color-&lt;variant&gt;` (`info`، `success`، `warning`، `danger`). يتم رفع التنبيهات بشكل افتراضي؛
اضبط `has-shadow="false"` لتسطيح واحد (→ `-without-shadow`، عاكساً `hasShadow={false}` من InstUI).
تعطل السمة `timeout` (بالميلي ثانية) التنبيه تلقائياً بعد هذا التأخير — يتلاشى، ويزيل نفسه من DOM، وينطلق حدث فقاعي قابل للإلغاء `dismiss` (استدعِ `preventDefault()`
عليه للحفاظ على التنبيه مثبتاً). تستخدم حالات التلاشي أداة `transition` من `@pantoken/components`؛
قم بتحميل ورقة الأنماط الخاصة بها عند استخدام إقالة المهلة الزمنية. محتوى الفتحة هو نص الرسالة.

## Example

```html
<instui-alert variant="success" margin="0 0 small">Your changes were saved.</instui-alert>
<instui-alert variant="info" has-shadow="false">A flat, inline notice.</instui-alert>
<!-- auto-dismisses after 5s, firing a cancelable `dismiss` event: -->
<!-- <instui-alert variant="warning" timeout="5000">Saving…</instui-alert> -->
```
