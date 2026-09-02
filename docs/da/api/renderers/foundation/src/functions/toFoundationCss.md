[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationCss

# Funktion: toFoundationCss()

> **toFoundationCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Udsend det tynde runtime CSS-overlay: tema Foundations kompilerede klasser med `var(--instui-*)`.

## Parametre

### options?

[`ToFoundationCssOptions`](../interfaces/ToFoundationCssOptions.md) = `{}`

[ToFoundationCssOptions](../interfaces/ToFoundationCssOptions.md).

## Returnerer

`string`

CSS-strengen til overlay.

## Eksempel

**Omfang overlay til en container**

```ts
toFoundationCss({ scope: ".instui" });
```
