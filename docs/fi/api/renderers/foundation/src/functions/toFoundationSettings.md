[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationSettings

# Funktio: toFoundationSettings()

> **toFoundationSettings**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Kokeellinen</span>

Emit the Foundation Sass settings override. Load it before `@include foundation-everything`.

## Parametrit

### options?

[`ToFoundationSettingsOptions`](../interfaces/ToFoundationSettingsOptions.md) = `{}`

[ToFoundationSettingsOptions](../interfaces/ToFoundationSettingsOptions.md).

## Palauttaa

`string`

The Sass partial as a string.

## Esimerkki

**Let consumer settings still win**

```ts
toFoundationSettings({ useDefault: true });
```
