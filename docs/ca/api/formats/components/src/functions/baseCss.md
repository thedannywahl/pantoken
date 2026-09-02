[pantoken](../../../../index.md) / [formats/components/src](../index.md) / baseCss

# Funció: baseCss()

> **baseCss**(): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Construir la full d'estils base/restabliment per consentiment: valors per defecte globals del document des dels tokens (box-sizing, restabliment del cos, superfície de la pàgina, color/font de text base, `color-scheme`, enllaç base), seguit de les regles de focus-ring (un valor per defecte a nivell de document que es dirigeix a enfocables bàsics). Només les *regles* de l'anell es troben aquí — les propietats personalitzades `--instui-focus-outline-*` que llegeixen s'exporten a la full de tokens (`@pantoken/css`), així que `base.css` ja no les redefeix. Carrega'l una vegada, abans de les fulles de component i prosa, quan pantoken posseeix la pàgina.

## Retorna

`string`

La cadena CSS.
