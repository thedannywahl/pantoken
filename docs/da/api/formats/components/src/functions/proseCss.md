[pantoken](../../../../index.md) / [formats/components/src](../index.md) / proseCss

# Funktion: proseCss()

> **proseCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Byg InstUI-look prose stylesheet, områdebegræns til `options.scope` (standard `:where(body)`, så det
antages automatisk uden en wrapper-klasse — som `base.css`).

```demo
self:prose
```

## Parametre

### options?

[`ProseOptions`](../interfaces/ProseOptions.md) = `{}`

[ProseOptions](../interfaces/ProseOptions.md).

## Returnerer

`string`

CSS-strengen.
