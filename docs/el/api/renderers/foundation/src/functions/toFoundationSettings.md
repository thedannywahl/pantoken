[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationSettings

# Συνάρτηση: toFoundationSettings()

> **toFoundationSettings**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Πειραματικό</span>

Emit the Foundation Sass settings override. Load it before `@include foundation-everything`.

## Παράμετροι

### options?

[`ToFoundationSettingsOptions`](../interfaces/ToFoundationSettingsOptions.md) = `{}`

[ToFoundationSettingsOptions](../interfaces/ToFoundationSettingsOptions.md).

## Επιστρέφει

`string`

The Sass partial as a string.

## Παράδειγμα

**Let consumer settings still win**

```ts
toFoundationSettings({ useDefault: true });
```
