[pantoken](../../../../../index.md) / [plugins/pantoken/colors/src](../index.md) / lighten

# Funció: lighten()

> **lighten**(`color`, `percent?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Aclareix per `percent` punts de lluminositat HSL — el mirall només CSS de ui-color-utils `lighten` (tinycolor augmenta la lluminositat HSL). Utilitza sintaxi de color relatiu perquè es conservin la tonalitat i la saturació.

## Paràmetres

### color

`string`

El color base.

### percent?

`number` = `10`

Punts de lluminositat a afegir (per defecte `10`, coincidint amb la configuració per defecte de tinycolor).

## Retorna

`string`

Una expressió de color relatiu `hsl(from …)`.

## Exemple

```ts
lighten("var(--brand)", 10); // "hsl(from var(--brand) h s calc(l + 10))"
```
