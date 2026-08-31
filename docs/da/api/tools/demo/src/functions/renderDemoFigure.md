[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / renderDemoFigure

# Function: renderDemoFigure()

> **renderDemoFigure**(`resolved`): `string`

Gengivelse af demo-panel HTML for et løst demo: en bar, sandboxet, lazy-loadet iframe formateret som et
live eksempel (ingen vært-chrome — køreren inden bærer sin egen fane-værktøjslinje). Stil det med
`@pantoken/demo/demo.css`.

## Parameters

### resolved

[`ResolvedDemo`](../interfaces/ResolvedDemo.md)

Et [ResolvedDemo](../interfaces/ResolvedDemo.md).

## Returns

`string`

Panel HTML-strengen.
