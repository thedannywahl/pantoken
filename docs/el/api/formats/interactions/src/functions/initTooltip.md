[pantoken](../../../../index.md) / [formats/interactions/src](../index.md) / initTooltip

# Συνάρτηση: initTooltip()

> **initTooltip**(`wrapper`, `tip`, `options?`): [`TooltipHandle`](../interfaces/TooltipHandle.md)

Wire hover/focus show-hide with delay onto a tooltip wrapper and its tip
bubble. Returns a cleanup function for use in web component disconnectedCallback.

  CSS:  wrapper = .instui-tooltip element, tip = its .tip child
  WC:   wrapper = shadow .instui-tooltip, tip = shadow .tip

## Παράμετροι

### wrapper

`HTMLElement`

### tip

`HTMLElement`

### options?

[`TooltipOptions`](../interfaces/TooltipOptions.md)

## Επιστρέφει

[`TooltipHandle`](../interfaces/TooltipHandle.md)
