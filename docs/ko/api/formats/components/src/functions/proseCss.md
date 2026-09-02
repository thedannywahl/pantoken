[pantoken](../../../../index.md) / [formats/components/src](../index.md) / proseCss

# 함수: proseCss()

> **proseCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Build the InstUI-look prose stylesheet, scoped to `options.scope` (default `:where(body)`, so it
applies automatically without a wrapper class — like `base.css`).

```demo
self:prose
```

## 매개변수

### options?

[`ProseOptions`](../interfaces/ProseOptions.md) = `{}`

[ProseOptions](../interfaces/ProseOptions.md).

## 반환값

`string`

The CSS string.
