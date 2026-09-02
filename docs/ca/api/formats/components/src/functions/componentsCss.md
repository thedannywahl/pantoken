[pantoken](../../../../index.md) / [formats/components/src](../index.md) / componentsCss

# Funció: componentsCss()

> **componentsCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Construir la full d'estils del component agregat: les regles de cada component en l'ordre de concat `COMPONENTS`.
L'alias de mida i els bessons d'alias s'afegeixen PER COMPONENT (dins del seu propi bloc) de manera que cada àlies es documenta a la seva pròpia pàgina — els àlies es descobreixen des de les metadades `@alias {@link -x}` o `@deprecated {@link -x}` de cada registre (vegeu `withAliases`), no d'una llista central mantinguda manualment. L'escala d'ombra `--instui-elevation-*` que els components referencien es defineix a la full de tokens (`@pantoken/css`), així que ja no està integrada aquí.

## Paràmetres

### options?

[`ComponentOptions`](../interfaces/ComponentOptions.md) = `{}`

[ComponentOptions](../interfaces/ComponentOptions.md).

## Retorna

`string`

La cadena CSS.
