[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / RegisterContextOptions

# Interface: RegisterContextOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

الخيارات التي `register()` و [buildRegisterContext](../functions/buildRegisterContext.md) تشاركها (كل شيء ما عدا `only`، وهو
يكون منطقيًا فقط في موقع استدعاء `register()` — يقرر مستدعي `buildRegisterContext` مجموعة العنصر
الخاصة بهم مباشرة).

## Properties

### prefix?

> `optional` **prefix?**: `string` \| `null`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

---

### locale?

> `optional` **locale?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

---

### strings?

> `optional` **strings?**: `Partial`\<[`WebComponentStrings`](WebComponentStrings.md)\>

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

---

### dir?

> `optional` **dir?**: `"ltr"` \| `"rtl"`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>
