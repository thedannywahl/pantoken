[pantoken](../../../../index.md) / [formats/interactions/src](../index.md) / initRemove

# Function: initRemove()

> **initRemove**(`target`, `options?`): [`RemoveHandle`](../interfaces/RemoveHandle.md)

Fjern et mål efter en timeout. Før fjernelse udløses en aflysbar, spredende `dismiss` begivenhed.
Hvis du forhindrer denne begivenhed, forbliver målet isført.

Timeout er en eksplicit millisekund-indstilling eller målets beregnede, enhedsuløs `--timeout` CSS
brugerdefineret egenskab. Manglende, ikke-endelige og ikke-positive værdier starter ikke en timer. En fade bruger
`@pantoken/components` `transition` utility's klasser (`.instui-transition` + `-fade-*`), og venter derefter
på `transitionend` (med en fallback); `transition: "none"` fjerner øjeblikkeligt.

## Parameters

### target

`HTMLElement`

### options?

[`RemoveOptions`](../interfaces/RemoveOptions.md) = `{}`

## Returns

[`RemoveHandle`](../interfaces/RemoveHandle.md)
