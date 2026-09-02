[pantoken](../../../../index.md) / [formats/components/src](../index.md) / proseCss

# Funció: proseCss()

> **proseCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Construeix el full d'estils de prosa amb aparença InstUI, amb abast a `options.scope` (per defecte `:where(body)`, per tant s'aplica automàticament sense una classe envoltant — com `base.css`).

```demo
self:prose
```

## Paràmetres

### options?

[`ProseOptions`](../interfaces/ProseOptions.md) = `{}`

[ProseOptions](../interfaces/ProseOptions.md).

## Retorna

`string`

La cadena CSS.
