[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / truncate

# Variable: truncate

> `const` **truncate**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-truncate&gt;` — fikserer slottet tekst til et fast antal linjer med en ellipsis. `lines` accepterer et positivt heltal eller `auto`. Et tal sætter den brugerdefinerede egenskab `--lines` direkte. `auto` beregner en linjetælling fra værtsens tilgængelige højde og anvender det som `--lines`. Udelad `lines` til trunkering af enkelt linje.

## Example

```html
<instui-truncate lines="2">A long description that will be clamped to two lines…</instui-truncate>
```
