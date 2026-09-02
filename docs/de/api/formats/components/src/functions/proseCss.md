[pantoken](../../../../index.md) / [formats/components/src](../index.md) / proseCss

# Funktion: proseCss()

> **proseCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Build the InstUI-look prose stylesheet, scoped to `options.scope` (default `:where(body)`, so it
applies automatically without a wrapper class — like `base.css`).

```demo
self:prose
```

## Parameter

### options?

[`ProseOptions`](../interfaces/ProseOptions.md) = `{}`

[ProseOptions](../interfaces/ProseOptions.md).

## Rückgabe

`string`

The CSS string.
