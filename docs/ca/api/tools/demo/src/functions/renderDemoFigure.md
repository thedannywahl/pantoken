[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / renderDemoFigure

# Funció: renderDemoFigure()

> **renderDemoFigure**(`resolved`): `string`

Renderitza el HTML del panell de demostració per a una demostració resolta: un iframe descendent, aïllat, carregat de manera perezosa, emmarcada com a
exemple en directe (sense chrome amfitrió — el corredor interior porta la seva pròpia barra d'eines de pestanya). Estila-ho amb
`@pantoken/demo/demo.css`.

## Paràmetres

### resolved

[`ResolvedDemo`](../interfaces/ResolvedDemo.md)

Una [ResolvedDemo](../interfaces/ResolvedDemo.md).

## Retorna

`string`

La cadena HTML del panell.
