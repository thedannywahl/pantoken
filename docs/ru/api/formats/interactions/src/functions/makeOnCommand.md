[pantoken](../../../../index.md) / [formats/interactions/src](../index.md) / makeOnCommand

# Функция: makeOnCommand()

> **makeOnCommand**(`invokerSupported`): [`OnCommand`](../type-aliases/OnCommand.md)

Build the `command`-event router: forward a target's `command` events to a handler, and where the
Invoker Commands API is missing, delegate matching `commandfor` clicks across the target's tree.

## Параметры

### invokerSupported

`boolean`

## Возвращаемое значение

[`OnCommand`](../type-aliases/OnCommand.md)
