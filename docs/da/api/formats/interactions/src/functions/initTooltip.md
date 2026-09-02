[pantoken](../../../../index.md) / [formats/interactions/src](../index.md) / initTooltip

# Funktion: initTooltip()

> **initTooltip**(`wrapper`, `tip`, `options?`): [`TooltipHandle`](../interfaces/TooltipHandle.md)

Forbind hover/fokus vis-skjul med forsinkelse til en tooltip-wrapper og dens tip-boble. Returnerer en oprensingsfunktion til brug i web component disconnectedCallback.

  CSS:  wrapper = .instui-tooltip element, tip = dets .tip barn
  WC:   wrapper = shadow .instui-tooltip, tip = shadow .tip

## Parametre

### wrapper

`HTMLElement`

### tip

`HTMLElement`

### options?

[`TooltipOptions`](../interfaces/TooltipOptions.md)

## Returnerer

[`TooltipHandle`](../interfaces/TooltipHandle.md)
