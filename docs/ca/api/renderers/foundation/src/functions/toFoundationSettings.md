[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationSettings

# Function: toFoundationSettings()

> **toFoundationSettings**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Emet l'invalidació de la configuració Sass de Foundation. Carrega-la abans de `@include foundation-everything`.

## Parameters

### options?

[`ToFoundationSettingsOptions`](../interfaces/ToFoundationSettingsOptions.md) = `{}`

[ToFoundationSettingsOptions](../interfaces/ToFoundationSettingsOptions.md).

## Returns

`string`

La parcel·la Sass com a cadena.

## Example

**Deixa que la configuració del consumidor segueixi guanyant**

```ts
toFoundationSettings({ useDefault: true });
```
