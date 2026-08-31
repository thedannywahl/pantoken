[pantoken](../../../../../index.md) / [plugins/pantoken/colors/src](../index.md) / darken

# Function: darken()

> **darken**(`color`, `percent?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Enfosqueix per `percent` punts de lluminositat HSL — el mirall només CSS de ui-color-utils `darken` (tinycolor redueix la lluminositat HSL). Utilitza sintaxi de color relatiu perquè es conservin la tonalitat i la saturació.

En `hsl()` relatiu, el canal `l` es resol a `&lt;number&gt;` en l'escala 0–100 — la mateixa escala que `amount` de tinycolor utilitza — així que els punts es resten directament (sense `%`).

## Parameters

### color

`string`

El color base.

### percent?

`number` = `10`

Punts de lluminositat a restar (per defecte `10`, coincidint amb la configuració per defecte de tinycolor).

## Returns

`string`

Una expressió de color relatiu `hsl(from …)`.

## Example

```ts
darken("var(--brand)", 10); // "hsl(from var(--brand) h s calc(l - 10))"
```
