[pantoken](../../../../../index.md) / [plugins/pantoken/colors/src](../index.md) / alpha

# Function: alpha()

> **alpha**(`color`, `percent`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Գույնի անթափանցիկությունը սահմանել `percent`%-ի — ui-color-utils `alpha`-ի միայն CSS համարժեքը: Խառնել `transparent`-ի հետ ստացվում է այն գույնը այդ ալֆա ալիքում:

## Parameters

### color

`string`

Հիմքային գույն (բառացիկ, `var(--token)`, կամ ներդրված օգնականի արդյունք):

### percent

`number`

Թիրախային անթափանցիկություն, 0–100:

## Returns

`string`

Մի `color-mix()` արտահայտություն:

## Example

```ts
alpha("var(--brand)", 10); // "color-mix(in srgb, var(--brand) 10%, transparent)"
```
