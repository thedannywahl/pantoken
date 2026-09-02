[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationSettings

# פונקציה: toFoundationSettings()

> **toFoundationSettings**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">ניסיוני</span>

Emit the Foundation Sass settings override. Load it before `@include foundation-everything`.

## פרמטרים

### options?

[`ToFoundationSettingsOptions`](../interfaces/ToFoundationSettingsOptions.md) = `{}`

[ToFoundationSettingsOptions](../interfaces/ToFoundationSettingsOptions.md).

## מחזיר

`string`

The Sass partial as a string.

## דוגמה

**Let consumer settings still win**

```ts
toFoundationSettings({ useDefault: true });
```
