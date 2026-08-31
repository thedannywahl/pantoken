[pantoken](../../../../../index.md) / [plugins/pantoken/colors/src](../index.md) / overlayColors

# Function: overlayColors()

> **overlayColors**(`base`, `overlay`, `percent?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Հարթեցրեք `overlay`-ը (`percent`% ուժի) անթափանց `base`-ի վրա — CSS միայն տեղադրում ui-color-utils `overlayColors`-ի համար: Այդ օգնականը source-over-composites երկու RGBA գույներ մեկ անթափանց արդյունքի մեջ; ընդհանուր դեպքը (թափանցական ներկ պինդ մակերեսի վրա) հենց երկու-գույն `color-mix()`-ն է: Ընդհանուր RGBA-over-RGBA compositing չի կարող լինել մեկ CSS գույն, այնպես որ սա ընդամենը անթափանց-հիմք դեպքը ծածկում է:

## Parameters

### base

`string`

Անթափանց ֆոնային գույն:

### overlay

`string`

Գույն, որը դրվել է դրա վրա:

### percent?

`number` = `50`

Որքան շատ `overlay` է երեւում, 0–100 (լռելյայն `50`):

## Returns

`string`

Մի `color-mix()` արտահայտություն:

## Example

```ts
overlayColors("var(--surface)", "var(--brand)", 12);
// "color-mix(in srgb, var(--brand) 12%, var(--surface))"
```
