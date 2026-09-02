[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / renderDemoFigure

# Funksjon: renderDemoFigure()

> **renderDemoFigure**(`resolved`): `string`

Render the demo panel HTML for a resolved demo: a bare, sandboxed, lazy-loaded iframe framed like a
live example (no host chrome — the runner inside carries its own tab toolbar). Style it with
`@pantoken/demo/demo.css`.

## Parametere

### resolved

[`ResolvedDemo`](../interfaces/ResolvedDemo.md)

A [ResolvedDemo](../interfaces/ResolvedDemo.md).

## Returnerer

`string`

The panel HTML string.
