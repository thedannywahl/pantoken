[pantoken](../../../../index.md) / [formats/components/src](../index.md) / componentsCss

# Function: componentsCss()

> **componentsCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Byg det aggregerede komponentstylesheet: hver komponents regler i `COMPONENTS` concat-rækkefølge.
Størrelse-alias og alias-tvillinger tilføjes PR KOMPONENT (inden for sit eget afsnit), så hver alias
dokumenterer på sin egen side — aliasserne opdages fra hver records `@alias {@link -x}` eller
`@deprecated {@link -x}` metadata (se `withAliases`), ikke en centralt håndholdt liste. Den
`--instui-elevation-*` skyggeskala, som komponenterne refererer til, er defineret i token-arket
(`@pantoken/css`), så det er ikke længere inline her.

## Parameters

### options?

[`ComponentOptions`](../interfaces/ComponentOptions.md) = `{}`

[ComponentOptions](../interfaces/ComponentOptions.md).

## Returns

`string`

CSS-strengen.
