[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationSettings

# Função: toFoundationSettings()

> **toFoundationSettings**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Emit the Foundation Sass settings override. Load it before `@include foundation-everything`.

## Parâmetros

### options?

[`ToFoundationSettingsOptions`](../interfaces/ToFoundationSettingsOptions.md) = `{}`

[ToFoundationSettingsOptions](../interfaces/ToFoundationSettingsOptions.md).

## Retorna

`string`

The Sass partial as a string.

## Exemplo

**Let consumer settings still win**

```ts
toFoundationSettings({ useDefault: true });
```
