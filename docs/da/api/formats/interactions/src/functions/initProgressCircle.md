[pantoken](../../../../index.md) / [formats/interactions/src](../index.md) / initProgressCircle

# Funktion: initProgressCircle()

> **initProgressCircle**(`target`, `options?`): [`ProgressCircleHandle`](../interfaces/ProgressCircleHandle.md)

Frigiv en ProgressCircles mount-animation-modifikator efter dens konfigurerede forsinkelse.

Forsinkelsen er en eksplicit millisekund-indstilling eller målets beregnede, enhedsuløs
`--animation-delay` brugerdefineret egenskab. Manglende, negative og ikke-endelige værdier bliver nul. Både den
kanoniske modifikator og dens forældet stavefejls-alias accepteres og fjernes.

## Parametre

### target

`HTMLElement`

### options?

[`ProgressCircleOptions`](../interfaces/ProgressCircleOptions.md) = `{}`

## Returnerer

[`ProgressCircleHandle`](../interfaces/ProgressCircleHandle.md)
