[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationSettings

# Funktion: toFoundationSettings()

> **toFoundationSettings**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Udsend Foundation Sass-indstillingers tilsidesættelse. Indlæs det før `@include foundation-everything`.

## Parametre

### options?

[`ToFoundationSettingsOptions`](../interfaces/ToFoundationSettingsOptions.md) = `{}`

[ToFoundationSettingsOptions](../interfaces/ToFoundationSettingsOptions.md).

## Returnerer

`string`

Sass-delen som en streng.

## Eksempel

**Lad forbrugenes indstillinger stadig vinde**

```ts
toFoundationSettings({ useDefault: true });
```
