[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationCss

# دالة: toFoundationCss()

> **toFoundationCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

أصدر تراكب CSS خفيف لوقت التشغيل: قصر/تفعيل فئات Foundation المجمعة للثيم باستخدام `var(--instui-*)`.

## المعلمات

### options?

[`ToFoundationCssOptions`](../interfaces/ToFoundationCssOptions.md) = `{}`

[ToFoundationCssOptions](../interfaces/ToFoundationCssOptions.md).

## القيم المرجعة

`string`

سلسلة CSS الخاصة بالتراكب.

## مثال

**قصر التراكب على حاوية**

```ts
toFoundationCss({ scope: ".instui" });
```
