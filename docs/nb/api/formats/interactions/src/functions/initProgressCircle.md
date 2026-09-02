[pantoken](../../../../index.md) / [formats/interactions/src](../index.md) / initProgressCircle

# Funksjon: initProgressCircle()

> **initProgressCircle**(`target`, `options?`): [`ProgressCircleHandle`](../interfaces/ProgressCircleHandle.md)

Release a ProgressCircle's mount-animation modifier after its configured delay.

The delay is an explicit millisecond option or the target's computed, unitless
`--animation-delay` custom property. Missing, negative, and non-finite values become zero. Both the
canonical modifier and its deprecated typo alias are accepted and removed.

## Parametere

### target

`HTMLElement`

### options?

[`ProgressCircleOptions`](../interfaces/ProgressCircleOptions.md) = `{}`

## Returnerer

[`ProgressCircleHandle`](../interfaces/ProgressCircleHandle.md)
