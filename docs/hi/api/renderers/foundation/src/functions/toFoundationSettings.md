[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationSettings

# फंक्शन: toFoundationSettings()

> **toFoundationSettings**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">प्रयोगात्मक</span>

Emit the Foundation Sass settings override. Load it before `@include foundation-everything`.

## पैरामीटर

### options?

[`ToFoundationSettingsOptions`](../interfaces/ToFoundationSettingsOptions.md) = `{}`

[ToFoundationSettingsOptions](../interfaces/ToFoundationSettingsOptions.md).

## वापसी

`string`

The Sass partial as a string.

## उदाहरण

**Let consumer settings still win**

```ts
toFoundationSettings({ useDefault: true });
```
