[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / renderDemoFigure

# ฟังก์ชัน: renderDemoFigure()

> **renderDemoFigure**(`resolved`): `string`

Render the demo panel HTML for a resolved demo: a bare, sandboxed, lazy-loaded iframe framed like a
live example (no host chrome — the runner inside carries its own tab toolbar). Style it with
`@pantoken/demo/demo.css`.

## พารามิเตอร์

### resolved

[`ResolvedDemo`](../interfaces/ResolvedDemo.md)

A [ResolvedDemo](../interfaces/ResolvedDemo.md).

## คืนค่า

`string`

The panel HTML string.
