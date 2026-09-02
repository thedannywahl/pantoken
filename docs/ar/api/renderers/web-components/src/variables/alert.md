[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / alert

# متغير: alert

> `const` **alert**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

`&lt;instui-alert&gt;` — رسالة حالة مضمنة تحتوي على `role="alert"`. تُطابق الخاصية `variant` المُعدِّل
`-color-&lt;variant&gt;` (`info`, `success`, `warning`, `danger`). التنبيهات مرتفعة افتراضيًا؛
اضبط `has-shadow="false"` لتسطيح إحداها (→ `-without-shadow`، مطابقًا لِ InstUI's `hasShadow={false}`). الخاصية `timeout` (بالملي ثانية) تُغلق التنبيه تلقائيًا بعد هذا التأخير — يتلاشى،
يُزال من شجرة DOM، ويطلق حدثًا نافذًا قابلًا للإلغاء ومتدفقًا `dismiss` (استدعِ `preventDefault()` عليه لإبقاء التنبيه مثبتًا). حالات التلاشي تستخدم مُسَاعِد `@pantoken/components`' `transition`؛
حمِّل ورقة الأنماط الخاصة به عند استخدام الإغلاق بالمهلة. المحتوى الممرَّر (slotted) هو جسم الرسالة.

## مثال

```html
<instui-alert variant="success" margin="0 0 small">Your changes were saved.</instui-alert>
<instui-alert variant="info" has-shadow="false">A flat, inline notice.</instui-alert>
<!-- auto-dismisses after 5s, firing a cancelable `dismiss` event: -->
<!-- <instui-alert variant="warning" timeout="5000">Saving…</instui-alert> -->
```
