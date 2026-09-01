[pantoken](../../../../../index.md) / [plugins/pantoken/layouts/src](../index.md) / layouts

# دالة: layouts()

> **layouts**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

إنشاء مكوّن إضافي لـ pantoken يقوم بإصدار قواعد تأليف التخطيط.

## المعلمات

### options?

[`LayoutsOptions`](../interfaces/LayoutsOptions.md) = `{}`

## القيم المرجعة

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

## مثال

```ts
const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
```
