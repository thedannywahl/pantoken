[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationCss

# Função: toFoundationCss()

> **toFoundationCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Emit the thin runtime CSS overlay: theme Foundation's compiled classes with `var(--instui-*)`.

## Parâmetros

### options?

[`ToFoundationCssOptions`](../interfaces/ToFoundationCssOptions.md) = `{}`

[ToFoundationCssOptions](../interfaces/ToFoundationCssOptions.md).

## Retorna

`string`

The overlay CSS string.

## Exemplo

**Scope the overlay to a container**

```ts
toFoundationCss({ scope: ".instui" });
```
