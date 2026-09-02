[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationSettings

# Funció: toFoundationSettings()

> **toFoundationSettings**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Emet l'invalidació de la configuració Sass de Foundation. Carrega-la abans de `@include foundation-everything`.

## Paràmetres

### options?

[`ToFoundationSettingsOptions`](../interfaces/ToFoundationSettingsOptions.md) = `{}`

[ToFoundationSettingsOptions](../interfaces/ToFoundationSettingsOptions.md).

## Retorna

`string`

La parcel·la Sass com a cadena.

## Exemple

**Deixa que la configuració del consumidor segueixi guanyant**

```ts
toFoundationSettings({ useDefault: true });
```
