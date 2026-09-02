[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationCss

# फंक्शन: toFoundationCss()

> **toFoundationCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">प्रयोगात्मक</span>

Emit the thin runtime CSS overlay: theme Foundation's compiled classes with `var(--instui-*)`.

## पैरामीटर

### options?

[`ToFoundationCssOptions`](../interfaces/ToFoundationCssOptions.md) = `{}`

[ToFoundationCssOptions](../interfaces/ToFoundationCssOptions.md).

## वापसी

`string`

The overlay CSS string.

## उदाहरण

**Scope the overlay to a container**

```ts
toFoundationCss({ scope: ".instui" });
```
