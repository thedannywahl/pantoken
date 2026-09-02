[pantoken](../../../../../index.md) / [plugins/pantoken/colors/src](../index.md) / alpha

# Funció: alpha()

> **alpha**(`color`, `percent`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Estableix l'opacitat d'un color a `percent`% — el mirall només CSS de ui-color-utils `alpha`. Barrejar amb `transparent` produeix exactament el color en aquest canal alfa.

## Paràmetres

### color

`string`

El color base (literal, `var(--token)`, o un resultat d'ajudant imbricat).

### percent

`number`

L'opacitat objectiu, 0–100.

## Retorna

`string`

Una expressió `color-mix()`.

## Exemple

```ts
alpha("var(--brand)", 10); // "color-mix(in srgb, var(--brand) 10%, transparent)"
```
