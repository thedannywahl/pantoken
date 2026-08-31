[pantoken](../../../../index.md) / [formats/interactions/src](../index.md) / initRemove

# Function: initRemove()

> **initRemove**(`target`, `options?`): [`RemoveHandle`](../interfaces/RemoveHandle.md)

Elimina un target després d'un temps d'espera. Abans de l'eliminació, genera un event `dismiss` cancel·lable i que es propaga. Evitar aquest event manté el target muntat.

El temps d'espera és una opció de mil·lisegons explícita o la propietat personalitzada CSS `--timeout` calculada i sense unitats del target. Els valors que falten, no finits i no positius no armen un temporitzador. Un desvaniment utilitza les classes de la utilitat `@pantoken/components` `transition` (`.instui-transition` + `-fade-*`), després espera `transitionend` (amb una fallback); `transition: "none"` elimina immediatament.

## Parameters

### target

`HTMLElement`

### options?

[`RemoveOptions`](../interfaces/RemoveOptions.md) = `{}`

## Returns

[`RemoveHandle`](../interfaces/RemoveHandle.md)
