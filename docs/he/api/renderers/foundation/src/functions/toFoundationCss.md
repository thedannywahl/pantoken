[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationCss

# פונקציה: toFoundationCss()

> **toFoundationCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">ניסיוני</span>

Emit the thin runtime CSS overlay: theme Foundation's compiled classes with `var(--instui-*)`.

## פרמטרים

### options?

[`ToFoundationCssOptions`](../interfaces/ToFoundationCssOptions.md) = `{}`

[ToFoundationCssOptions](../interfaces/ToFoundationCssOptions.md).

## מחזיר

`string`

The overlay CSS string.

## דוגמה

**Scope the overlay to a container**

```ts
toFoundationCss({ scope: ".instui" });
```
