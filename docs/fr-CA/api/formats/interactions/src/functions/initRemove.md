[pantoken](../../../../index.md) / [formats/interactions/src](../index.md) / initRemove

# Fonction: initRemove()

> **initRemove**(`target`, `options?`): [`RemoveHandle`](../interfaces/RemoveHandle.md)

Remove a target after a timeout. Before removal, fires a cancelable, bubbling `dismiss` event.
Preventing that event keeps the target mounted.

The timeout is an explicit millisecond option or the target's computed, unitless `--timeout` CSS
custom property. Missing, non-finite, and non-positive values don't arm a timer. A fade uses the
`@pantoken/components` `transition` utility's classes (`.instui-transition` + `-fade-*`), then waits
for `transitionend` (with a fallback); `transition: "none"` removes immediately.

## Paramètres

### target

`HTMLElement`

### options?

[`RemoveOptions`](../interfaces/RemoveOptions.md) = `{}`

## Retourne

[`RemoveHandle`](../interfaces/RemoveHandle.md)
