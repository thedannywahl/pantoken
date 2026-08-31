[pantoken](../../../../index.md) / [formats/interactions/src](../index.md) / initProgressCircle

# Function: initProgressCircle()

> **initProgressCircle**(`target`, `options?`): [`ProgressCircleHandle`](../interfaces/ProgressCircleHandle.md)

Alliberar el modificador de l'animació de muntatge d'un ProgressCircle després del seu retard configurat.

El retard és una opció de mil·lisegons explícita o la propietat personalitzada `--animation-delay` calculada i sense unitats del target. Els valors que falten, negatius i no finits es converteixen en zero. El modificador canònic i el seu alias de tipus erroni deprecat s'accepten i s'eliminen.

## Parameters

### target

`HTMLElement`

### options?

[`ProgressCircleOptions`](../interfaces/ProgressCircleOptions.md) = `{}`

## Returns

[`ProgressCircleHandle`](../interfaces/ProgressCircleHandle.md)
